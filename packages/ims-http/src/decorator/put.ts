import { makeDecorator, TypeDecorator } from 'ims-decorator';
export const PutMetadataKey = 'PutMetadataKey';
export interface PutOptions {
  type: string;
}
export interface PutDecorator {
  (opt?: PutOptions): TypeDecorator;
}
export const Put: PutDecorator = makeDecorator(
  PutMetadataKey,
  'visitPut',
  dir => dir,
);
