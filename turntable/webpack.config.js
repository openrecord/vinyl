const path = require('path');
const webpack = require('webpack');
const importSchema = require('graphql-import').importSchema;

const OUTPUT_DIR = path.resolve(__dirname, '../dist');
const FUNCTIONS_DIR = path.resolve(OUTPUT_DIR, 'functions');

console.log('endpoint: ', process.env.ENDPOINT);

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    graphql: './graphql.ts'
  },
  output: {
    path: FUNCTIONS_DIR
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-typescript', '@babel/preset-env']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.mjs', '.js', '.ts']
  },
  plugins: [
    new webpack.DefinePlugin({
      ENDPOINT: JSON.stringify(process.env.ENDPOINT),
      IS_PRODUCTION: JSON.stringify(process.env.NODE_ENV === 'production'),
      SCHEMA: JSON.stringify(importSchema('turntable/server.graphql'))
    })
  ],
  optimization: {
    minimize: false
  }
};
