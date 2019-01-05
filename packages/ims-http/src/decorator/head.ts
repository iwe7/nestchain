import { makeDecorator, TypeDecorator } from 'ims-decorator';
export const HeadMetadataKey = 'HeadMetadataKey';
export interface HeadOptions {
  method: 'head';
  path: string;
}
export interface HeadDecorator {
  (path?: string): TypeDecorator;
}
export const Head: HeadDecorator = makeDecorator(
  HeadMetadataKey,
  'visitHead',
  path => ({ path, method: 'head' }),
);
