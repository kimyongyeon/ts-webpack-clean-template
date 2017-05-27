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
    new CleanWebpackPlugin("dist"),
    new HtmlWebpackPlugin({template: './src/index.html'}),
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
            test: /\.(jpg|png|svg)$/,
            loader: 'url-loader',
            options: {
                limit: 25000
            }
        },
        {
            test: /\.(jpg|png|svg)$/,
            loader: 'file-loader',
            options: {
                name: '[path][name].[ext]'
            }
        },
    ]
  }
}
