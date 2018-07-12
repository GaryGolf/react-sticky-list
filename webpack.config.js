const path = require('path');
const webpack = require('webpack');

const prodCilentConfig = {
  mode: 'production',
  entry: './src/index.ts',
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
      { test: /\.css$/, loader: 'css-loader' }
    ]
  },

  externals: {
    'react': 'react',
    'react-waypoint': 'react-waypoint'
  }
};

module.exports = prodCilentConfig;
