import { corePlatform } from './platform/core';
import { Type } from './type';
import { Injector } from './di/injector';
export async function bootstrapModule<T>(m: Type<T>): Promise<Injector> {
  let platform = await corePlatform();
  let ref = await platform.bootstrapModule(m);
  return ref.injector;
}
