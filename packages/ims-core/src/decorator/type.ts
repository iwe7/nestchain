import { Type } from '../type';
import {
  LifeSubject,
  handlerObservable,
  symbolMetadataDef,
  toFrom,
} from '../util/index';
import { Symbol_observable } from 'ims-rxjs';
import { InjectionToken } from '../di/injection_token';
export enum MetadataType {
  class,
  constructor,
  parameter,
  method,
  property,
}
export interface BaseMetadata<D = any> {
  metadataType: MetadataType;
  metadataDef?: D;
  target: Type<any>;
  token: InjectionToken<MetadataFactory>;
}

export interface ClassMetadata<T = any> extends BaseMetadata<T> {
  parameters: ConstructorMetadata[];
  propertys: PropertyMetadata[];
  methods: MethodMetadata[];
}

export interface ConstructorMetadata<T = any> extends BaseMetadata<T> {
  parameterIndex: number;
  parameterType: any;
}

export interface PropertyMetadata<T = any> extends BaseMetadata<T> {
  propertyKey: PropertyKey;
  propertyType: any;
}

export interface MethodMetadata<T = any> extends BaseMetadata<T> {
  propertyKey: PropertyKey;
  returnType: any;
  parameters: ParameterMetadata[];
}

export interface ParameterMetadata<T = any> extends BaseMetadata<T> {
  propertyKey: PropertyKey;
  parameterIndex: number;
  parameterType: any;
}

export type MetadataDef<T = any> =
  | ClassMetadata<T>
  | ConstructorMetadata<T>
  | PropertyMetadata<T>
  | MethodMetadata<T>
  | ParameterMetadata<T>;

export abstract class MetadataFactory {
  abstract type(life: LifeSubject, def: ClassMetadata): any;
}

export function getMethodDef(
  def: ClassMetadata,
  p: PropertyKey,
): MethodMetadata[] {
  return def.methods.filter(res => res.propertyKey === p);
}

export function getPropertyDef(
  def: ClassMetadata,
  p: PropertyKey,
): PropertyMetadata[] {
  return def.propertys.filter(res => res.propertyKey === p);
}

export class MetadataFactoryDefault extends MetadataFactory {
  path: PropertyKey[] = [];
  type(life: LifeSubject, def: ClassMetadata) {
    return new Proxy(def.target, {
      // 用于rxjs from操作符获取声明周期
      get: (target: any, p: PropertyKey, receiver: any) => {
        if (p === symbolMetadataDef) return def;
        let res = handlerObservable(p, life);
        if (res) return res;
        let out = Reflect.get(target, p, receiver);
        return toFrom(out, p);
      },
      construct: (target: any, argArray: any, newTarget?: any) => {
        let instanceLife = new LifeSubject();
        def.parameters.forEach(res => {
          let old = argArray[res.parameterIndex];
          argArray[res.parameterIndex] = this.constructorParameter(
            old,
            res,
            def,
          );
        });
        let instance = Reflect.construct(target, argArray, newTarget);
        instanceLife.next({
          state: 'end',
        });
        return this.create(instance, def, instanceLife);
      },
    });
  }
  create(value: any, def: ClassMetadata, life: LifeSubject) {
    return new Proxy(value, {
      get: (target: any, p: PropertyKey, receiver: any) => {
        this.path = [];
        this.path.push(p);
        if (p === symbolMetadataDef) return def;
        let observable = handlerObservable(p, life);
        if (observable) return observable;
        let res = Reflect.get(target, p, receiver);
        // 这个可能有多个装饰器
        let methodDef = getMethodDef(def, p);
        if (methodDef) {
          methodDef.map(method => {
            res = this.methodGet(res, method, def, life) || res;
          });
          return res;
        }
        let propertyDef = getPropertyDef(def, res);
        if (propertyDef) {
          propertyDef.forEach(property => {
            res = this.propertyGet(res, property, def, life) || res;
          });
          return res;
        }
        return Reflect.has(res, Symbol_observable) ? res : toFrom(res, p);
      },
      set: (target: any, p: PropertyKey, value: any, receiver: any) => {
        let old: any;
        if (Reflect.has(target, p)) {
          old = Reflect.get(target, p);
          life.next({
            type: 'update',
            state: 'start',
            payload: {
              value,
              old,
            },
          });
        }
        // 这个可能有多个装饰器
        let methodDef = getMethodDef(def, p);
        if (methodDef) {
          methodDef.map(method => {
            value = this.methodSet(old, value, method, def, life) || value;
          });
        }
        let propertyDef = getPropertyDef(def, p);
        if (propertyDef) {
          propertyDef.forEach(property => {
            value = this.propertySet(old, value, property, def, life) || value;
          });
        }
        if (Reflect.has(target, p)) {
          old = Reflect.get(target, p);
          life.next({
            type: 'update',
            state: 'end',
            payload: {
              old,
              value,
            },
          });
        }
        return Reflect.set(target, p, value, receiver);
      },
      defineProperty(
        target: any,
        p: PropertyKey,
        attributes: PropertyDescriptor,
      ) {
        if (Reflect.has(target, p)) {
        } else {
          life.next({
            type: 'add',
            state: 'end',
            payload: {
              target,
              p,
              attributes,
            },
          });
        }
        return Reflect.defineProperty(target, p, attributes);
      },
      deleteProperty(target: any, p: PropertyKey) {
        life.next({
          type: 'delete',
          state: 'end',
          payload: {
            target,
            p,
          },
        });
        return Reflect.deleteProperty(target, p);
      },
    });
  }
  /**
   * 获取方法
   */
  methodGet(
    old: Function,
    methodDef: MethodMetadata,
    def: ClassMetadata,
    life: LifeSubject,
  ) {
    return new Proxy(old, {
      apply(target: any, thisArg: any, argArray?: any) {
        methodDef.parameters.forEach(it => {
          let value = argArray[it.parameterIndex];
          argArray[it.parameterIndex] = this.parameter(value, it, def);
        });
        return Reflect.apply(target, thisArg, argArray);
      },
    });
  }
  /**
   * 设置方法
   * @param value
   * @param methodDef
   * @param def
   */
  methodSet(
    old: Function,
    value: Function,
    methodDef: MethodMetadata,
    def: ClassMetadata,
    life: LifeSubject,
  ) {
    return value;
  }
  /**
   * 获取属性
   * @param old
   * @param propertyDef
   * @param def
   */
  propertyGet(
    old: any,
    propertyDef: PropertyMetadata,
    def: ClassMetadata,
    life: LifeSubject,
  ) {
    return toFrom(old, propertyDef.propertyKey);
  }
  /**
   * 设置属性
   * @param old
   * @param value
   * @param propertyDef
   * @param def
   */
  propertySet(
    old: any,
    value: any,
    propertyDef: PropertyMetadata,
    def: ClassMetadata,
    life: LifeSubject,
  ) {
    return value;
  }

  /**
   * 参数
   * @param value
   * @param def
   * @param classDef
   */
  parameter(value: any, def: ParameterMetadata, classDef: ClassMetadata): any {
    return value;
  }
  /**
   * 构造参数
   * @param value
   * @param def
   * @param classDef
   */
  constructorParameter(
    value: any,
    def: ConstructorMetadata,
    classDef: ClassMetadata,
  ): any {
    return value;
  }
}
