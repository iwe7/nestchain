import { Type } from 'ims-core';
import { getMetadata, isClassMetadata, MetadataDef } from './metadata';
import { createDecoratorConstructor } from './createDecorator';
import { isNullOrUndefined, compose } from 'ims-util';

export class Visitor {
  visit(it: MetadataDef<any>, parent: any, context: any) {
    if (it.visit && this[it.visit]) return this[it.visit](it, parent, context);
    return it;
  }
  visitType(
    type: Type<any>,
    parent: any,
    context: any,
    options: any = {},
    ...args: any[]
  ) {
    let meta = getMetadata(type);
    meta = meta
      .filter(it => isClassMetadata(it))
      .map(it => {
        it.metadataDef = {
          ...it.metadataDef,
          ...options,
        };
        return this.visit(it, parent, type);
      });
    let Target = type;
    const factorys = meta
      .filter(it => {
        return !!it && isClassMetadata(it);
      })
      .filter(it => !isNullOrUndefined(it.metadataFactory))
      .map(it => it.metadataFactory);
    if (factorys.length > 0) {
      const fn = compose(...factorys);
      Target = fn(Target);
    }
    // 构造参数中的装饰器
    args = createDecoratorConstructor(args)(type);
    return new Target(...args) as any;
  }

  visitTypeOther(
    type: Type<any>,
    parent: any,
    context: any,
    key: string[] = [],
  ) {
    let meta = getMetadata(type);
    meta = meta
      .filter(it => !isClassMetadata(it))
      .map(it => {
        if (key.length > 0) {
          if (key.indexOf(it.metadataKey) > -1) {
            return this.visit(it, parent, context);
          }
        } else {
          return this.visit(it, parent, context);
        }
      });
  }
}
export function injector<T extends Visitor>(visitor: T) {
  return <T = any>(type: Type<any>, meta: any = {}, ...args: any[]): T => {
    return visitor.visitType(type, null, null, meta, ...args);
  };
}
