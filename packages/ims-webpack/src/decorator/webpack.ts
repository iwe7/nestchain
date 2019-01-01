import { makeDecorator, TypeDecorator } from 'ims-decorator';
export const WebpackMetadataKey = 'WebpackMetadataKey';
import { Configuration } from 'webpack';
export interface WebpackOptions extends Configuration {}
export interface WebpackDecoratory {
  (opt?: WebpackOptions): TypeDecorator;
}

export const Webpack: WebpackDecoratory = makeDecorator(
  WebpackMetadataKey,
  'visitWebpack',
  dir => dir,
);
