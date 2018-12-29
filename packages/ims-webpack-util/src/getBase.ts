import { Configuration } from 'webpack';
import * as path from 'path';
import { ROOT } from 'ims-const';

export function getBase(): Configuration {
  return {
    entry: {},
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: require.resolve('url-loader'),
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          use: [
            {
              loader: require.resolve('url-loader'),
              options: {
                limit: 2000,
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|bpm|svg)(\?.*)?$/,
          use: [
            {
              loader: require.resolve('url-loader'),
              options: {
                limit: 2000,
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'style-loader',
            },
            'typings-for-css-modules-loader?localIdentName=ims_[local]&modules&namedExport&camelCase',
            'sass-loader',
          ],
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'typings-for-css-modules-loader?modules&namedExport&camelCase',
          ],
        },
      ],
    },
    output: {},
    resolve: {
      extensions: [
        '.ts',
        '.tsx',
        '.js',
        '.json',
        '.svg',
        '.scss',
        '.less',
        '.css',
      ],
      mainFields: ['main', 'module'],
      symlinks: true,
      modules: ['node_modules'],
      alias: {
        'ims-*': path.join(ROOT, 'packages'),
      },
    },
    resolveLoader: {
      modules: [path.join(ROOT, 'node_modules')],
    },
    externals: [],
    plugins: [],
  };
}
