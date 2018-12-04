const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ReactRootPlugin = require('html-webpack-root-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const DEV = 0;
const STAGING = 1;
const PROD = 2;

module.exports = (env, argv) => {
	const isDev = argv.mode != 'production';
	const isStaging = process.env.BRANCH === 'develop' || process.env.PULL_REQUEST;
	const stage = isDev ? DEV : isStaging ? STAGING : PROD;

	let devtool, devServer, plugins, optimization;

	//TODO: Potentially leverage node-config
	const URLS = {
		[PROD]: {
			HTTP: 'https://us1.prisma.sh/jamesscottmcnamara/turntable/dev',
			WS: 'wss://us1.prisma.sh/jamesscottmcnamara/turntable/dev'
		},
		[STAGING]: {
			HTTP: 'https://develop--openrecord-api.netlify.com/.netlify/functions/graphql',
			WS: 'wss://us1.prisma.sh/jamesscottmcnamara/turntable/staging'
		},
		[DEV]: {
			HTTP: 'http://localhost:9000/.netlify/functions/graphql',
			WS: 'ws://localhost:4466/'
		}
	};

	plugins = [
		new HtmlWebPackPlugin({hash: true, template: 'public/index.ejs'}), // automatically create index.html based on webpack config
		new ReactRootPlugin(), // create react root within generated html file
		new CopyWebpackPlugin([{from: './public/_redirects', to: './'}]),
		new webpack.DefinePlugin({
			GRAPHQL_URI: JSON.stringify(URLS[stage])
		})
	];

	if (stage > DEV) {
		plugins.push(
			new UglifyJSPlugin(),
			new MiniCssExtractPlugin(),
			new CompressionPlugin({filename: '[path].gz[query]', test: /\.js/, algorithm: 'gzip'})
		);
		optimization = {
			runtimeChunk: 'single',
			splitChunks: {
				cacheGroups: {
					react: {
						test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
						name: 'react',
						chunks: 'all'
					},
					vendor: {
						test(module) {
							const context = module.context || '';
							return (
								context.includes('node_modules') &&
								!(context.includes('/react/') || context.includes('/react-dom/'))
							);
						},
						name: 'vendor',
						chunks: 'all'
					}
				}
			}
		};
	} else {
		plugins.push(new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin());
		devtool = 'inline-source-map'; // enable web browser debugging
		devServer = {
			allowedHosts: ['.ngrok.io', '0.0.0.0'],
			port: 8080,
			hot: true,
			historyApiFallback: true,
			proxy: {
				'/.netlify': {
					target: 'http://localhost:9000',
					pathRewrite: {'^/.netlify/functions': ''}
				}
			}
		};
	}

	return {
		entry: ['babel-polyfill', './src/index.jsx'],
		module: {
			rules: [
				{
					test: /\.scss/,
					enforce: 'pre',
					loader: 'import-glob-loader'
				},
				{
					test: /\.s?css/,
					use: [
						stage > DEV ? MiniCssExtractPlugin.loader : 'style-loader', // creates style nodes from JS strings
						{loader: 'css-loader', options: {importLoaders: 1}}, // translates CSS into CommonJS
						'postcss-loader', // adds on vendor prefixes and adds css polyfills
						'sass-loader' // compiles Sass to CSS
					]
				},
				{
					test: /\.(svg|jpg)$/,
					loader: 'file-loader'
				},
				{
					test: /\.(mjs|js|jsx|ts|tsx)$/,
					include: /src/,
					use: ['babel-loader']
				},

				{
					test: /\.mjs$/,
					include: /node_modules/,
					type: 'javascript/auto'
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/,
					use: ['file-loader']
				}
			]
		},
		resolve: {
			extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx'] // load jsx files without including extension
		},
		externals: {
			config: JSON.stringify(require('config')) // Allow front-end to import config as "config"
		},
		plugins,
		devtool,
		devServer,
		optimization
	};
};
