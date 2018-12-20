import { Type } from 'ims-core';
import { getMetadata, isClassMetadata } from './metadata';
import { createDecoratorConstructor } from './createDecorator';
import { isNullOrUndefined, compose } from 'ims-util';
export function injector(visitor: any) {
  return <T = any>(type: Type<any>, ...args: any[]): T => {
    let meta = getMetadata(type);
    meta = meta
      .filter(it => isClassMetadata(it))
      .map(it => {
        return visitor && visitor.visit(it, null, type);
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
  };
}
