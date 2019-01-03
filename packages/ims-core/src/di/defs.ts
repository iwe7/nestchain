import { Type } from '../type';
export function defineInjectable<T>(opts: {
  providedIn?: Type<any> | 'root' | 'any' | null;
  factory: () => T;
}): never {
  return ({
    providedIn: (opts.providedIn as any) || null,
    factory: opts.factory,
    value: undefined,
  } as InjectableDef<T>) as never;
}
export interface InjectorType<T> extends Type<T> {
  ngInjectorDef: never;
}
export interface InjectableDef<T> {
  providedIn: InjectorType<any> | 'root' | 'any' | null;
  factory: () => T;
  value: T | undefined;
}
