"use strict";

var path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
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
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".html", ".css"]
  },
  plugins: [
    new CleanWebpackPlugin("dist"), // 청소 
    new HtmlWebpackPlugin({template: './src/index.html'}), // html을 소스에 포함
    new ExtractTextPlugin('[name].css'),
    extractLess
  ],
  module: {
    rules : [
        {
            test: /\.less$/,
            use: [
                {
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "less-loader",
                    options: {
                        strictMath: true,
                        noIeCompat: true
                    }
                }
            ]
        }
    ],
    loaders: [
        { // ts -> js
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
  }
}
