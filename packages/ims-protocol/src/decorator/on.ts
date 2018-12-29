import { makeDecorator, TypeDecorator } from 'ims-decorator';
export const OnMetadataKey = 'OnMetadataKey';
export interface OnOptions {
  type: string;
}
export interface OnDecorator {
  (opt?: OnOptions): TypeDecorator;
}
export const On: OnDecorator = makeDecorator(
  OnMetadataKey,
  'visitOn',
  dir => dir,
);
