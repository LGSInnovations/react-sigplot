var path = require('path');
var webpack = require('webpack');
module.exports = {
  entry: {
    'react-sigplot': ['./src/index'],
    example: './example',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    library: 'react-sigplot',
    libraryTarget: 'umd',
  },
  devtool: 'source-map',
  mode: 'production',
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
    ],
  },
};
