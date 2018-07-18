const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const prodCilentConfig = {
  mode: 'production',
  entry: './src/sticky-list.tsx',
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
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' }
    ]
  },

  plugins: [
    new CopyWebpackPlugin([{ from: './src/index.d.ts', to: './' }])
  ],

  externals: {
    'react': 'react',
    'react-waypoint': 'react-waypoint'
  }
};

module.exports = prodCilentConfig;
