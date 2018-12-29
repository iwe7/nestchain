import { makeDecorator, TypeDecorator } from 'ims-decorator';
export const HttpMetadataKey = 'HttpMetadataKey';
export interface HttpOptions {
  address: string;
}
export interface HttpDecorator {
  (opt?: HttpOptions): TypeDecorator;
}
export const Http: HttpDecorator = makeDecorator(
  HttpMetadataKey,
  'visitHttp',
  dir => dir,
);
