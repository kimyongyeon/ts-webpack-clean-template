"use strict";

const path = require("path");
const WebpackBrowserPlugin = require('webpack-browser-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractLess = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  devtool: "source-map",
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [
    // html 소스에 포함하고 reload 
    new HtmlWebpackPlugin({template: './src/index.html'}),
    // 브라우저에서 ts파일 수정시 실시간 reload
    new WebpackBrowserPlugin(),
    new ExtractTextPlugin('[name].css'),
    extractLess
  ],
  module: {
    rules: [{
        test: /\.less$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader"
        }, {
            loader: "less-loader", options: {
                strictMath: true,
                noIeCompat: true
            }
        }]
    }],
    loaders: [
      {
        test: /\.tsx?$/,
        loaders: ["babel-loader", "ts-loader"]
      }, 
      { // css
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }, 
      { // 이미지 최적화
        test: /\.(jpg|png|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 25000
        }
      }, 
      { // 이미지 최적화
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      }
    ]
  },
  devServer: {
    //inline: true hot: true
  }
}
