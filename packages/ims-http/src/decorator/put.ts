import { makeDecorator, TypeDecorator } from 'ims-decorator';
export const PutMetadataKey = 'PutMetadataKey';
export interface PutOptions {
  method: 'put';
  path: string;
}
export interface PutDecorator {
  (opt?: PutOptions): TypeDecorator;
}
export const Put: PutDecorator = makeDecorator(
  PutMetadataKey,
  'visitPut',
  path => ({ path, method: 'put' }),
);
