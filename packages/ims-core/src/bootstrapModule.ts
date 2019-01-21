import { corePlatform } from './platform/core';
import { Type } from './type';
import { ImsRef } from './di/ims';
export async function bootstrapModule<T>(m: Type<T>): Promise<ImsRef<T>> {
  let platform = await corePlatform();
  return await platform.bootstrapModule(m);
}
