const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const mode = process.env.NODE_ENV;

module.exports = {
  mode: 'development',
  entry: './examples/src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 3000
  },

  module: {
    rules: [
   
      { test: /\.tsx?$/, 
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: path.join(__dirname, "tsconfig.json")
        }
      },
      { test: /\.css$/, use: [ 
        // { loader: 'style-loader' },
        { loader: 'css-loader' }
      ]}
      // { test: /\.css$/, use: [ { loader: 'style-loader' } ,
      //   { loader: 'css-loader', options: {
      //     module: true,
      //     sourceMap: true,
      //     localIdentName: '[local]__[hash:base64:5]'
      //   } }
      // ]}
    ]
  },

  plugins: [
    new CopyWebpackPlugin([{ from: './src/index.d.ts', to: './' }]),
    new HtmlWebpackPlugin({ template: path.join(__dirname, './src/index.html') }),
    new HtmlWebpackIncludeAssetsPlugin({ assets: ['../src/sticky-list.css'], append: true }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false)
    })
  ]
};

