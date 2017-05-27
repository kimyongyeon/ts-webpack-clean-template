"use strict";

var path = require("path");
const WebpackBrowserPlugin = require('webpack-browser-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  devtool: "source-map",
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".html", ".css"]
  },
  plugins: [
    // html 소스에 포함하고 reload 
    new HtmlWebpackPlugin({template: './src/index.html'}),
    // 브라우저에서 ts파일 수정시 실시간 reload
    new WebpackBrowserPlugin(),
    new ExtractTextPlugin('[name].css')
  ],
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loaders: ["babel-loader", "ts-loader"]
      }, 
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.png$/,
        loader: "url-loader?limit=100000"
      }, {
        test: /\.jpg$/,
        loader: "file-loader"
      },
    ]
  },
  devServer: {
    //inline: true hot: true
  }
}
