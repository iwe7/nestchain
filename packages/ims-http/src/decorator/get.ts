import { makeDecorator, TypeDecorator } from 'ims-decorator';
export const GetMetadataKey = 'GetMetadataKey';
export interface GetOptions {
  path: string;
}
export interface GetDecorator {
  (path?: string): TypeDecorator;
}
export const Get: GetDecorator = makeDecorator(
  GetMetadataKey,
  'visitGet',
  path => {
    path = path || '/';
    return { path };
  },
);
