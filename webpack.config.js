const path = require('path');
const webpack = require('webpack');

module.exports = {
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  entry: [path.join(__dirname, 'src', 'index.js')],
  externals: {
    'react': 'react'
  },
  eslint: {
    failOnWarning: true,
    failOnError: true
  },
  module: {
    preLoaders: [{
      text: /\.jsx?$/,
      loader: 'eslint',
      include: path.join(__dirname, 'src'),
      exclude: /node_modules/
    }],
    loaders: [{
      test: /\.jsx?$/,
      include: path.join(__dirname, 'src'),
      exclude: /node_modules/,
      loader: combineLoaders([
        {
          loader: 'babel',
          query: {
            presets: [
              require.resolve('babel-preset-es2015'),
              require.resolve('babel-preset-react'),
              require.resolve('babel-preset-stage-0')
            ],
            plugins: [
              require.resolve('babel-plugin-syntax-class-properties'),
              require.resolve('babel-plugin-transform-class-properties')
            ]
          }
        }
      ])
    }]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        PROJECT_TYPE: JSON.stringify('javascript')
      }
    })
  ],
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/static/',
    library: 'react-sigplot',
    libraryTarget: 'react-sigplot'
  },
  resolve: {
    root: [ __dirname ],
    extensions: ['', '.jsx', '.js']
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  }
};
