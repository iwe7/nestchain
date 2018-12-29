import { merge } from 'ims-util';
import {
  Configuration,
  WatchIgnorePlugin,
  HashedModuleIdsPlugin,
  DllReferencePlugin,
} from 'webpack';
import FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
import HtmlWebpackPlugin = require('html-webpack-plugin');
import WebpackBar = require('webpackbar');
import { getBase } from './getBase';
const webpackBase = getBase();
let root = process.cwd();
import { join } from 'path';
export function getWebConfig({ watch, index, from, to }): Configuration {
  let cfg: Configuration = merge(
    {
      mode: 'development',
      target: 'web',
      devtool: 'source-map',
      node: { global: true },
      watch: watch,
      entry: {
        main: from,
      },
      output: {
        path: to,
        filename: '[name].js',
      },
      resolve: {
        mainFields: ['browser', 'main'],
        alias: {
          imeepos: `${root}/packages/`,
        },
      },
      plugins: [
        new DllReferencePlugin({
          context: '.',
          manifest: join(root, 'cache/dll/react.manifest.json'),
        }),
        new DllReferencePlugin({
          context: '.',
          manifest: join(root, 'cache/dll/polyfill.manifest.json'),
        }),
        new DllReferencePlugin({
          context: '.',
          manifest: join(root, 'cache/dll/socket.manifest.json'),
        }),
        new DllReferencePlugin({
          context: '.',
          manifest: join(root, 'cache/dll/rxjs.manifest.json'),
        }),
        new DllReferencePlugin({
          context: '.',
          manifest: join(root, 'cache/dll/ramda.manifest.json'),
        }),
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: index,
          title: 'demo',
        }),
        new WatchIgnorePlugin([/css\.d\.ts$/]),
        new WebpackBar(),
        new HashedModuleIdsPlugin(),
        new FriendlyErrorsPlugin(),
      ],
      module: {
        rules: [],
      },
      resolveLoader: {},
    },
    webpackBase,
  );
  return cfg;
}
