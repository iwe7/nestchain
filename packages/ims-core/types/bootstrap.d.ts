import { Type } from './type';
import { ImsRef } from './di/ims';
export declare function bootstrapModule<T>(m: Type<T>): Promise<ImsRef<T>>;
