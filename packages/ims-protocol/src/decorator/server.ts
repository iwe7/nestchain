import { makeDecorator, TypeDecorator } from 'ims-decorator';
import { IInjector } from 'ims-core';

export const ServerMetadataKey = 'ServerMetadataKey';
export interface ServerOptions {
  address: string;
  router: IInjector;
}
export interface ServerDecorator {
  (opt?: ServerOptions): TypeDecorator;
}
export const Server: ServerDecorator = makeDecorator(
  ServerMetadataKey,
  'visitServer',
  dir => dir,
);
