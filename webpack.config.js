let path = require("path");
let webpack = require("webpack");
let CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    //"common": "./src/common.js",
    "libs/interactive-report": "./src/js/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist/js"),
    publicPath: "/js/",
    filename: "[name].bundle.js"
  },
  
  plugins: [
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
  ],
  
  resolve: {
      modules: [ 'node_modules' ],
      extensions: ['.js','.scss'],
      alias: {
        app: path.resolve(__dirname, "src/js"),
        npm: path.resolve(__dirname, 'node_modules'),
        styles: path.resolve(__dirname, "src/styles"),
        images: path.resolve(__dirname, "src/images")
      }
    },
    module: {
      loaders:[
      /*
        {
          test: /\.js?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query:{
            presets: ['es2015']
          }
        },
      */
            {
                test: /\.js$/,
                loader: 'ify-loader'
            },
        {
          test: /\.(scss|css)$/,
          loaders: ['style-loader', 'css-loader', 
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve(__dirname, 'postcss.config.js')
              }
            }
          }
          , 'sass-loader']
        },
        {
          test: /\.(svg|png|jpg|gif|woff|woff2|eot|ttf)$/,
          loader: 'url-loader'
        },
        {
          test: /\.html$/,
          use: [
            { loader: 'raw-loader' }
          ]
        }
      ]
    },
    devtool: "source-map"
};