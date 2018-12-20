import {
  getMetadata,
  isPropertyMetadata,
  isMethodMetadata,
  isParameterMetadata,
  isConstructorMetadata,
  ConstructorMetadata,
} from './metadata';
import { Type } from 'ims-core';
import { isNullOrUndefined, compose } from 'ims-util';

import { MetadataDef } from './metadata';
export function createDecorator<T = any>(type: Type<any>): Type<T> {
  return type;
}

export function getDecorator<T = any>(type: Type<T>): Type<T> {
  return type;
}

export function getStaticProperty(target: Type<any>, type: string) {
  return (getDecorator(target) as any)[type];
}

export function createDecoratorProperty(
  type: any,
  key: any,
  metadata: Array<MetadataDef<any>>,
) {
  const factorys: any[] = [];
  metadata
    .filter(meta => isPropertyMetadata(meta) && meta.propertyKey === key)
    .filter(it => !isNullOrUndefined(it.metadataFactory))
    .map(it => {
      if (isPropertyMetadata(it)) {
        factorys.push(it.metadataFactory.bind(type));
      }
    });
  if (factorys.length > 0) {
    try {
      type[key] = compose(...factorys)(type[key] || undefined);
    } catch (err) {
      compose(...factorys)(type[key] || undefined);
    }
  }
}

export function createDecoratorMethod(
  type: any,
  key: any,
  metadata: Array<MetadataDef<any>>,
  target: Type<any>,
) {
  const factorys: any[] = [];
  const afters: any[] = [];
  const befores: any[] = [];
  const defaults: any[] = [];
  metadata
    .filter(meta => isMethodMetadata(meta) && meta.propertyKey === key)
    .filter(it => !isNullOrUndefined(it.metadataFactory))
    .map(it => {
      if (isMethodMetadata(it)) {
        factorys.push(it.metadataFactory.bind(type));
        if (it.methodRuntime === 'after') {
          afters.push(it.metadataFactory.bind(type));
        } else if (it.methodRuntime === 'before') {
          befores.push(it.metadataFactory.bind(type));
        } else {
          defaults.push(it.metadataFactory.bind(type));
        }
      }
    });
  if (factorys.length > 0) {
    const oldMethod = type[key];
    if (oldMethod) {
      const newMethod = (...args: any[]) => {
        args = createDecoratorParameter(args)(target, key, type);
        if (befores.length > 0) {
          args = compose(...befores)(...args);
        }
        const result = oldMethod(...args);
        if (afters.length > 0) {
          compose(...afters)(result);
        }
        return result;
      };
      if (defaults.length > 0) {
        compose(...defaults)(oldMethod.bind(type));
      }
      type[key] = newMethod;
    }
  }
}

function createDecoratorParameter(args: any[]) {
  return (type: Type<any>, key: any, that: any) => {
    const metadata = getMetadata(type);
    const item: { [key: number]: any[] } = {};
    metadata
      .filter(meta => isParameterMetadata(meta))
      .filter(it => !isNullOrUndefined(it.metadataFactory))
      .map(it => {
        if (isParameterMetadata(it)) {
          item[it.parameterIndex] = item[it.parameterIndex] || [];
          item[it.parameterIndex].push(it.metadataFactory.bind(that));
        }
      });
    Object.keys(item).map(index => {
      args[index] = compose(...item[index])(args[index]);
    });
    return args;
  };
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
