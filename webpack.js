const path = require('path');
const root = process.cwd();
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: {
    main: path.join(root, 'src/public/index.tsx'),
  },
  output: {
    path: path.join(root, 'www/public/web'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(root, 'src/public/index.html'),
    }),
  ],
};
