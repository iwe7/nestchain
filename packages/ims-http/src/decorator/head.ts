import { makeDecorator, TypeDecorator } from 'ims-decorator';
export const HeadMetadataKey = 'HeadMetadataKey';
export interface HeadOptions {
  type: string;
}
export interface HeadDecorator {
  (opt?: HeadOptions): TypeDecorator;
}
export const Head: HeadDecorator = makeDecorator(
  HeadMetadataKey,
  'visitHead',
  dir => dir,
);
