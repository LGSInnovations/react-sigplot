var path = require('path');
var webpack = require('webpack');
module.exports = {
  entry: {
    'react-sigplot': './src/index',
  },
  output: {
      path: (__dirname, 'dist'),
      filename: '[name].js',
      library: 'react-sigplot',
      libraryTarget: 'umd'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
};
