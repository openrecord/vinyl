const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ReactRootPlugin = require('html-webpack-root-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env, argv) => {
	console.info('Building webpack...', {mode: argv.mode});
	const isProduction = argv.mode === 'production';

	let devtool;

	const plugins = [
		new HtmlWebPackPlugin(), // automatically create index.html based on webpack config
		new ReactRootPlugin() // create react root within generated html file
	];

	if (isProduction) {
		plugins.push(new UglifyJSPlugin());
	} else {
		devtool = 'inline-source-map'; // enable web browser debugging
	}

	return {
		entry: ['babel-polyfill', './src/index.jsx'],
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader' // babel options loaded via .babelrc
					}
				}
			]
		},
		resolve: {
			extensions: ['.js', '.jsx'] // load jsx files without including extension
		},
		plugins: plugins,
		devtool: devtool
	};
};
