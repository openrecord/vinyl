const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const OUTPUT_DIR = path.resolve(__dirname, '../dist');
const FUNCTIONS_DIR = path.resolve(OUTPUT_DIR, 'functions');
const SCHEMAS_DIR = path.resolve(FUNCTIONS_DIR, 'schemas');

console.log('endpoint is', process.env.ENDPOINT);

module.exports = {
	devtool: 'inline-source-map',
	entry: ['babel-polyfill', './graphql.ts'],
	output: {
		filename: 'graphql.js',
		path: FUNCTIONS_DIR
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
			ENDPOINT: JSON.stringify(process.env.ENDPOINT),
			IS_PRODUCTION: JSON.stringify(process.env.NODE_ENV === 'production')
		}),
		new CopyWebpackPlugin([
			{from: '../schema.graphql', to: SCHEMAS_DIR},
			{from: '../server.graphql', to: SCHEMAS_DIR}
		])
	],
	optimization: {
		minimize: false
	}
};
