import {
  MetadataDef,
  MetadataType,
  PropertyMetadata,
  ParameterMetadata,
  MethodMetadata,
  ConstructorMetadata,
  defineMetadata,
} from './metadata';
import { isNullOrUndefined, isNumber, isFunction } from 'ims-util';
import {
  getDesignParamTypes,
  getDesignReturnType,
  getDesignType,
} from './util';
import { Type } from 'ims-core';
export interface TypeDecorator {
  (type: any): any;
  (target: any, propertyKey?: any, parameterIndex?: any): void;
}
interface DefaultOptionsFunction<T> {
  (...args: any[]): T;
}
function makeMetadataCtor(props?: (...args: any[]) => any): any {
  return function ctor(...args: any[]) {
    if (props) {
      const values = props(...args);
      for (const propName in values) {
        this[propName] = values[propName];
      }
    }
  };
}

export function makeDecorator<T = any>(
  metadataKey: string,
  visit: any,
  props: DefaultOptionsFunction<T> = dir => dir,
  typeFn?: (type: Type<any>, meta: any) => any,
  parentClass?: Type<any>,
): any {
  const metaCtor = makeMetadataCtor(props);
  function DecoratorFactory(...args: any[]): any {
    if (this instanceof DecoratorFactory) {
      metaCtor.call(this, ...args);
      return this;
    }
    const annotationInstance = new (DecoratorFactory as any)(...args);
    (<any>Decorator).annotation = annotationInstance;
    return Decorator;
    function Decorator(
      target: any,
      propertyKey?: any,
      descriptor?: TypedPropertyDescriptor<any> | number,
    ) {
      let opt = {};
      if (isFunction(props)) {
        opt = props(...args);
      }
      let meta: MetadataDef = {
        metadataKey,
        metadataType: MetadataType.class,
        metadataDef: opt || {},
        metadataFactory: undefined,
        target,
        visit,
      };
      if (!isNullOrUndefined(propertyKey)) {
        if (isNumber(descriptor)) {
          const types = getDesignParamTypes(target, propertyKey);
          meta.metadataType = MetadataType.parameter;
          (meta as ParameterMetadata).propertyKey = propertyKey;
          (meta as ParameterMetadata).parameterIndex = descriptor;
          (meta as ParameterMetadata).parameterType = types[descriptor];
          (meta as ParameterMetadata).parameters = types;
          (meta as ParameterMetadata).target = target.constructor;
          (meta as ParameterMetadata).primaryKey = `${metadataKey}_parameter_${descriptor}`;
          typeFn && typeFn(target, meta);
          defineMetadata(meta);
        } else if (isNullOrUndefined(descriptor)) {
          // PropertyDecorator
          const type = getDesignType(target, propertyKey);
          meta.metadataType = MetadataType.property;
          (meta as PropertyMetadata).propertyKey = propertyKey;
          (meta as PropertyMetadata).propertyType = type;
          (meta as PropertyMetadata).primaryKey = `${metadataKey}_property_${propertyKey}`;
          (meta as ParameterMetadata).target = target.constructor;
          typeFn && typeFn(target, meta);
          defineMetadata(meta);
        } else {
          // MethodDecorator
          const returnType = getDesignReturnType(target, propertyKey);
          const parameters = getDesignParamTypes(target, propertyKey);
          const designType = getDesignType(target, propertyKey);
          (meta as MethodMetadata).propertyKey = propertyKey;
          (meta as MethodMetadata).descriptor = descriptor;
          (meta as MethodMetadata).returnType = returnType;
          (meta as MethodMetadata).parameters = parameters || [];
          (meta as MethodMetadata).propertyType = designType;
          (meta as MethodMetadata).methodRuntime = 'default';
          (meta as MethodMetadata).primaryKey = `${metadataKey}_method_${propertyKey}`;
          (meta as ParameterMetadata).target = target.constructor;
          if (isFunction(descriptor.get) || isFunction(descriptor.set)) {
            meta.metadataType = MetadataType.property;
          } else {
            meta.metadataType = MetadataType.method;
          }
          typeFn && typeFn(target, meta);
          defineMetadata(meta);
        }
      } else if (isNumber(descriptor)) {
        // constructor
        const parameters = getDesignParamTypes(target);
        // 处理parameters
        meta.metadataType = MetadataType.constructor;
        (meta as ConstructorMetadata).parameterIndex = descriptor;
        (meta as ConstructorMetadata).parameterType = parameters[descriptor];
        (meta as ConstructorMetadata).parameters = parameters;
        (meta as MethodMetadata).primaryKey = `${metadataKey}_constructor_${descriptor}`;
        typeFn && typeFn(target, meta);
        defineMetadata(meta);
      } else {
        // ClassDecorator
        const parameters = getDesignParamTypes(target);
        meta.metadataType = MetadataType.class;
        meta.primaryKey = metadataKey;
        meta.parameters = parameters;
        typeFn && typeFn(target, meta);
        defineMetadata(meta);
      }
      return target;
    }
  }
  if (parentClass) {
    DecoratorFactory.prototype = Object.create(parentClass.prototype);
  }
  DecoratorFactory.prototype.metadataKey = metadataKey;
  return DecoratorFactory;
}
