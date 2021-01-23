const HtmlPlugin = require('html-webpack-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'publick'),
  },
  devServer: {
    port: 3000,
  },
  plugins: [
    new HtmlPlugin({
      template: './src/index.html',
    }),
    new CleanWebpackPlugin(),
  ],
};
