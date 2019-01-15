import {
  createPlatformFactory,
  corePlatform,
  getNgModuleStaticProvider,
} from 'ims-core';
import { NgModule } from 'ims-core';
import { MultihashModule } from 'ims-multihash';
import { LoggerModule } from 'packages/ims-logger/src';
import { providers } from './engine/express';
export const nodePlatform = createPlatformFactory(
  corePlatform,
  'node-platform',
  [
    () => getNgModuleStaticProvider(MultihashModule),
    () => getNgModuleStaticProvider(LoggerModule),
    ...providers,
  ],
);

class ImsNodeModule {}
export async function bootstrap(cfg: NgModule) {
  NgModule(cfg)(ImsNodeModule);
  try {
    let platform = await nodePlatform();
    let ref = await platform.bootstrapModule(ImsNodeModule);
    return ref;
  } catch (e) {
    throw e;
  }
}
export * from './engine/express';
