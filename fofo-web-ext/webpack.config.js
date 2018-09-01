const path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    contentScript: './src/contentScript.js',
    background: './src/background.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }
    }]
  }
};