import { makeDecorator, TypeDecorator } from 'ims-decorator';
export const HttpMetadataKey = 'HttpMetadataKey';
export interface HttpOptions {
  path: string;
}
export interface HttpDecorator {
  (path?: string): TypeDecorator;
}
export const Http: HttpDecorator = makeDecorator(
  HttpMetadataKey,
  'visitHttp',
  path => ({ path }),
);
