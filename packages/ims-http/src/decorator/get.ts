import { makeDecorator, TypeDecorator } from 'ims-decorator';
export const GetMetadataKey = 'GetMetadataKey';
export interface GetOptions {
  path: string;
}
export interface GetDecorator {
  (opt?: GetOptions): TypeDecorator;
}
export const Get: GetDecorator = makeDecorator(
  GetMetadataKey,
  'visitGet',
  dir => dir,
);
