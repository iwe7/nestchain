import { Type } from './type';
import { Injector } from './di/injector';
import { createImsFactory, ImsRef } from './di/ims';
export async function bootstrapModule<T>(m: Type<T>): Promise<ImsRef<T>> {
  let model = createImsFactory<T>(m);
  return await model.create(Injector.top);
}
