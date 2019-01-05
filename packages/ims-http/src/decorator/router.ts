import {
  makeDecorator,
  TypeDecorator,
  MetadataDef,
  getMetadata,
  isClassMetadata,
  isMethodMetadata,
} from 'ims-decorator';
import { Type } from 'ims-core';
import { GetOptions } from './get';
import { inject } from 'ims-injector';
export const RouterMetadataKey = 'RouterMetadataKey';
export interface RouterOptions {
  path: string;
}
export interface RouterDecorator {
  (path?: string): TypeDecorator;
  new (path?: string): TypeDecorator;
}
export const Router: RouterDecorator = makeDecorator(
  RouterMetadataKey,
  'visitRouter',
  path => ({ path: path || '/' }),
  (type: Type<any>, meta: MetadataDef<RouterOptions>) => {},
);

export interface RouterRefChild {
  method: string;
  path: string;
  action: string;
}
export class RouterRef<T> {
  constructor(
    public instance: T,
    public prefix: string,
    public children: RouterRefChild[],
  ) {}
}
export class RouterFactory {
  static create<T>(type: Type<T>): RouterRef<T> {
    let meta = getMetadata(type);
    let prefix = '/';
    let children: RouterRefChild[] = [];
    meta.forEach(it => {
      if (isClassMetadata<RouterOptions>(it)) {
        if (it.metadataKey === RouterMetadataKey) {
          prefix = it.metadataDef.path;
        }
      }
      if (isMethodMetadata<GetOptions>(it)) {
        children.push({
          ...it.metadataDef,
          action: it.propertyKey as string,
        });
      }
    });
    return new RouterRef(inject(type), prefix, children);
  }
}
