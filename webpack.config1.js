var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/index.html',
  filename: 'index.html',
  inject: 'body'
})

var entryFile = path.resolve(__dirname, './hello.js');

module.exports = {
  entry: './hello.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  }
  // plugins: [HTMLWebpackPluginConfig]
}