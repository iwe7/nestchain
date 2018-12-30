import { makeDecorator, TypeDecorator } from 'ims-decorator';
import { IInjector } from 'ims-core';
export const ClientMetadataKey = 'ClientMetadataKey';
export interface ClientOptions {
  router: IInjector;
}
export interface ClientDecorator {
  (opt?: ClientOptions): TypeDecorator;
}
export const Client: ClientDecorator = makeDecorator(
  ClientMetadataKey,
  'visitClient',
  dir => dir,
);
