import {
  getMetadata,
  isConstructorMetadata,
  ConstructorMetadata,
} from './metadata';

import { Type } from 'ims-core';
import { isNullOrUndefined, compose } from 'ims-util';

export function createDecorator<T = any>(type: Type<any>): Type<T> {
  return type;
}

export function getDecorator<T = any>(type: Type<T>): Type<T> {
  return type;
}

export function getStaticProperty(target: Type<any>, type: string) {
  return (getDecorator(target) as any)[type];
}

export function createDecoratorConstructor(args: any[]) {
  return (type: Type<any>) => {
    const metadata = getMetadata(type);
    const item: { [key: string]: any } = {};
    metadata
      .filter(meta => isConstructorMetadata(meta))
      .filter(it => !isNullOrUndefined(it.metadataFactory))
      .forEach((it: ConstructorMetadata) => {
        item[it.parameterIndex] = item[it.parameterIndex] || [];
        item[it.parameterIndex].push(it.metadataFactory.bind(type));
      });
    Object.keys(item).forEach(index => {
      args[index] = compose(...item[index])(args[index]);
    });
    return args;
  };
}
