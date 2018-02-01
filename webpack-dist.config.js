let webpackConfig = require('./webpack.config');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const plugins = [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({ title: 'Production'}),
    new UglifyJSPlugin({ sourceMap: true })
  /*
    new CommonsChunkPlugin({
      // The order of this array matters
      names: ["common"],
      minChunks: 2
    })
    */
  ]

webpackConfig.plugins = webpackConfig.plugins.concat(plugins);
console.log("plugins:",webpackConfig.plugins)
module.exports = webpackConfig;
