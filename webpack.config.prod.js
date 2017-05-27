var path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')

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
  ],
  module: {
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
        },
    ]
  }
}
