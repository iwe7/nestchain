const path = require('path');
const root = process.cwd();
const config = {
  entry: {
    main: path.join(root, 'src/public/index.tsx'),
  },
  output: {
    path: path.join(root, 'www', 'public/web'),
    filename: '[name].js',
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }],
  },
  plugins: [],
};
module.exports = config;
