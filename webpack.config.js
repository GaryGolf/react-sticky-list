const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const mode = process.env.NODE_ENV;
const PRODUCTION = mode == 'production';

const prodCilentConfig = {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2'
  },
  
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },

  devtool: false,

  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
      { test: /\.css$/, use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: {
          loader: 'css-loader',
          query: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[local]__[hash:base64:5]'
          }
        }
      })}
    ]
  },

  plugins: [
    new ExtractTextPlugin("styles.css"),
    new CleanWebpackPlugin(['dist']),
    new UglifyJsPlugin(),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true)
    })
  ]
};

module.exports = prodCilentConfig;