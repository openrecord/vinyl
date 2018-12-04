const path = require('path');
const webpack = require('webpack');

console.log('endpoint is', process.env.ENDPOINT);

module.exports = {
	devtool: 'inline-source-map',
	entry: ['babel-polyfill', './graphql.ts'],
	output: {
		filename: 'graphql.js',
		path: path.resolve(__dirname, '../dist/functions')
	},
	module: {
		rules: [
			{
				test: /\.(mjs|js|ts)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-typescript', '@babel/preset-env']
					}
				}
			},
			{
				test: /\.mjs$/,
				include: /node_modules/,
				type: 'javascript/auto'
			}
		]
	},
	resolve: {
		extensions: ['.mjs', '.js', '.ts']
	},
	node: {
		module: 'empty',
		fs: 'empty'
	},
	plugins: [
		new webpack.DefinePlugin({
			ENDPOINT: JSON.stringify(process.env.ENDPOINT)
		})
	],
	optimization: {
		minimize: false
	}
};
