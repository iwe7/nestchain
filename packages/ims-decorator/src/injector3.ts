import { Type, createProxy, iInjectorToArray } from 'ims-core';
import { getMetadata, MetadataDef, isConstructorMetadata } from './metadata';
import { ImsContext, GlobalContext } from './context';
import { ImsInjectorFactory } from './injectorFactory';
import { createMetadataParams } from './util';
export class Visitor {
  visit(it: MetadataDef<any>, type: Type<any>, context: ImsContext) {
    if (it.visit && this[it.visit]) return this[it.visit](it, type, context);
    return it;
  }
  visitType<T = any>(
    type: Type<T>,
    context: ImsContext = new ImsContext(),
  ): Type<T> {
    /**
     * 获取metadata
     */
    let meta = getMetadata(type);
    /**
     * 根据不同的平台进行区别处理
     */
    meta = meta.map(it => this.visit(it, type, context));
    meta
      .filter(it => !isConstructorMetadata(it))
      .forEach(it => (type = it.metadataFactory(type, it, context)));
    let constructorMetadata = meta.filter(it => isConstructorMetadata(it));
    type.prototype.onBeforeConstruct = function(
      argArray: any,
      newTarget?: any,
    ) {
      return [createMetadataParams(constructorMetadata, argArray), newTarget];
    };
    return createProxy(type);
  }

  create(type: Type<any>, context: ImsContext, ...args: any[]) {
    let Target = this.visitType(type, context);
    return new Target(...args);
  }
}

export function injector(visitor: Visitor) {
  return <T>(
    type: Type<T>,
    context: ImsContext = GlobalContext,
    ...args: any[]
  ): ImsInjectorFactory<T> => {
    let factory = new ImsInjectorFactory(visitor, context);
    factory.create(type, ...args);
    return factory;
  };
}
