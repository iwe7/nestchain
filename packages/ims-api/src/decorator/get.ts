import { makeDecorator, InjectionToken, MetadataFactory } from 'ims-core';
export const GetToken = new InjectionToken<MetadataFactory>('GetToken');
export interface Get {
  path?: string;
}
export const Get = makeDecorator<Get>(GetToken, def => {
  return {
    ...def.metadataDef,
  };
});
