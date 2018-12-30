import { makeDecorator, TypeDecorator } from 'ims-decorator';
export const HttpMetadataKey = 'HttpMetadataKey';
export interface HttpOptions {
  host: string;
  port: number;
}
export interface HttpDecorator {
  (opt?: HttpOptions): TypeDecorator;
}
export const Http: HttpDecorator = makeDecorator(
  HttpMetadataKey,
  'visitHttp',
  dir => dir,
);
