import { Type } from '../type';
import {
  getMetadata,
  isClassMetadata,
  ParameterMetadata,
  isParameterMetadata,
  isMethodMetadata,
  isPropertyMetadata,
  isConstructorMetadata,
  ConstructorMetadata,
  getDesignParamTypes,
} from 'ims-decorator';
import { inject } from './inject';


export function createProxyType(type: Type<any>) {
  let meta = getMetadata(type);
  let parameters = getDesignParamTypes(type) || [];
  meta
    .filter(it => isClassMetadata(it))
    .forEach(it => {
      if (it.metadataFactory) {
        type = it.metadataFactory(type);
      }
    });
  return createProxyWidthDefault(type, {
    /**
     * new
     * @param target
     * @param argArray
     * @param newTarget
     */
    construct(target: any, argArray: any, newTarget?: any) {
      let parameterMetas: ConstructorMetadata<any>[] = meta.filter(
        paramMeta => {
          if (isConstructorMetadata(paramMeta)) {
            parameters = paramMeta.parameters;
            return true;
          }
          return false;
        },
      ) as any;
      parameters.forEach((paramType, index) => {
        let val = paramType;
        if (!argArray[index]) {
          parameterMetas
            .filter(it => it.parameterIndex === index)
            .forEach(it => {
              if (it.metadataFactory) val = it.metadataFactory(val);
            });
          // inject
          argArray[index] = inject(val);
        }
      });
      let instance = Reflect.construct(target, argArray, newTarget);
      /**
       * 实例代理
       */
      return createProxyWidthDefault(instance, {
        get(target: any, p: PropertyKey, receiver: any): any {
          let old = Reflect.get(target, p, receiver);
          meta.forEach(it => {
            if (isMethodMetadata(it)) {
              if (it.propertyKey === p) {
                if (it.metadataFactory) {
                  old = it.metadataFactory(meta);
                }
              }
            } else if (isPropertyMetadata(it)) {
              if (it.propertyKey === p) {
                if (it.metadataFactory) {
                  old = it.metadataFactory(meta);
                }
              }
            }
          });
          if (typeof old === 'function' || typeof old === 'object') {
            if (old !== null) {
              return createProxyWidthDefault(old, {
                apply(target: any, thisArg: any, argArray?: any) {
                  let parameters = [];
                  let parameterMetas: ParameterMetadata<any>[] = meta.filter(
                    paramMeta => {
                      if (isParameterMetadata(paramMeta)) {
                        if (paramMeta.propertyKey === p) {
                          parameters = paramMeta.parameters;
                          return true;
                        }
                      }
                      return false;
                    },
                  ) as any;
                  parameters.forEach((paramType, index) => {
                    let val = paramType;
                    if (!argArray[index]) {
                      parameterMetas
                        .filter(it => it.parameterIndex === index)
                        .forEach(it => {
                          if (it.metadataFactory) val = it.metadataFactory(val);
                        });
                      // inject
                      argArray[index] = inject(paramType);
                    }
                  });
                  return Reflect.apply(target, thisArg, argArray);
                },
              });
            }
          }
          return old;
        },
      });
    },
  });
}

export function createProxyWidthDefault(
  item: object,
  config: ProxyHandler<any>,
) {
  return new Proxy(item, {
    getPrototypeOf(target: any): object | null {
      return Reflect.getPrototypeOf(target);
    },
    setPrototypeOf(target: any, v: any): boolean {
      return Reflect.setPrototypeOf(target, v);
    },
    isExtensible(target: any): boolean {
      return Reflect.isExtensible(target);
    },
    preventExtensions(target: any): boolean {
      return Reflect.preventExtensions(target);
    },
    getOwnPropertyDescriptor(
      target: any,
      p: PropertyKey,
    ): PropertyDescriptor | undefined {
      return Reflect.getOwnPropertyDescriptor(target, p);
    },
    has(target: any, p: PropertyKey): boolean {
      return Reflect.has(target, p);
    },
    get(target: any, p: PropertyKey, receiver: any): any {
      return Reflect.get(target, p, receiver);
    },
    set(target: any, p: PropertyKey, value: any, receiver: any): boolean {
      return Reflect.set(target, p, value, receiver);
    },
    deleteProperty(target: any, p: PropertyKey): boolean {
      return Reflect.deleteProperty(target, p);
    },
    defineProperty(
      target: any,
      p: PropertyKey,
      attributes: PropertyDescriptor,
    ): boolean {
      return Reflect.defineProperty(target, p, attributes);
    },
    enumerate(target: any): PropertyKey[] {
      return Reflect.enumerate(target) as any;
    },
    ownKeys(target: any): PropertyKey[] {
      return Reflect.ownKeys(target) as any;
    },
    apply(target: any, thisArg: any, argArray?: any): any {
      return Reflect.apply(target, thisArg, argArray) as any;
    },
    construct(target: any, argArray: any, newTarget?: any): object {
      return Reflect.construct(target, argArray, newTarget) as any;
    },
    ...config,
  });
}
