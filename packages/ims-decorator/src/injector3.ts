import { Type } from 'ims-core';
import {
  getMetadata,
  isConstructorMetadata,
  isClassMetadata,
  MetadataDef,
  MethodMetadata,
} from './metadata';
import {
  createMetadataType,
  createMetadataParams,
  getPrototypeMetadata,
} from './util';
import { isFunction } from 'util';
import { compose, isPromise } from 'ims-util';
import { Observable, forkJoin, of, from, isObservable } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
export class Visitor {
  observables: Observable<any>[] = [];
  addObservable(obs: Observable<any>) {
    this.observables.push(obs);
  }
  forkJoin() {
    if (this.observables.length > 0) {
      return forkJoin(...this.observables);
    } else {
      return of(null);
    }
  }
  visit(it: MetadataDef<any>, context?: any) {
    if (it.visit && this[it.visit]) return this[it.visit](it, context);
    return it;
  }
  visitType(type: Type<any>) {
    const meta = getMetadata(type).map(it => this.visit(it));
    let classMetadata = meta.filter(it => isClassMetadata(it));
    let Target = createMetadataType(type, classMetadata);
    return new Proxy(Target, {
      getPrototypeOf(tar: any): object | null {
        return Reflect.getPrototypeOf(tar);
      },
      setPrototypeOf(tar: any, v: any): boolean {
        return Reflect.setPrototypeOf(tar, v);
      },
      isExtensible(tar: any): boolean {
        return Reflect.isExtensible(tar);
      },
      preventExtensions(tar: any): boolean {
        return Reflect.preventExtensions(tar);
      },
      getOwnPropertyDescriptor(
        tar: any,
        p: PropertyKey,
      ): PropertyDescriptor | undefined {
        return Reflect.getOwnPropertyDescriptor(tar, p);
      },
      has(tar: any, p: PropertyKey): boolean {
        return Reflect.has(tar, p);
      },
      get(tar: any, p: PropertyKey, receiver: any): any {
        return Reflect.get(tar, p, receiver);
      },
      set(tar: any, p: PropertyKey, value: any, receiver: any): boolean {
        return Reflect.set(tar, p, value, receiver);
      },
      deleteProperty(tar: any, p: PropertyKey): boolean {
        return Reflect.deleteProperty(tar, p);
      },
      defineProperty(
        tar: any,
        p: PropertyKey,
        attributes: PropertyDescriptor,
      ): boolean {
        return Reflect.defineProperty(tar, p, attributes);
      },
      enumerate(tar: any): PropertyKey[] {
        return Reflect.enumerate(tar) as any;
      },
      ownKeys(tar: any): PropertyKey[] {
        return Reflect.ownKeys(tar);
      },
      apply(tar: any, thisArg: any, argArray?: any): any {
        return Reflect.apply(tar, thisArg, argArray);
      },
      construct(tar: any, argArray: any, newTarget?: any): object {
        let constructorMetadata = meta.filter(it => isConstructorMetadata(it));
        argArray = createMetadataParams(constructorMetadata, argArray);
        let instance = Reflect.construct(tar, argArray, newTarget);
        return new Proxy(instance, {
          set(tar: any, p: PropertyKey, value: any, receiver: any): boolean {
            return Reflect.set(tar, p, value, receiver);
          },
          get(tar: any, p: PropertyKey, receiver: any): any {
            let res = Reflect.get(tar, p, receiver);
            let prototypeMetadata = getPrototypeMetadata(meta, p);
            if (isFunction(res)) {
              return new Proxy(res, {
                apply(tar: any, thisArg: any, argArray?: any): any {
                  let after = (prototypeMetadata as MethodMetadata<
                    any
                  >[]).filter(it => it.methodRuntime === 'after');
                  let before = (prototypeMetadata as MethodMetadata<
                    any
                  >[]).filter(it => it.methodRuntime === 'before');
                  let def = (prototypeMetadata as MethodMetadata<any>[]).filter(
                    it => it.methodRuntime === 'default',
                  );
                  // default 处理函数主体
                  tar = compose(...def.map(it => it.metadataFactory))(
                    tar,
                    thisArg,
                    argArray,
                  );
                  // 参数
                  argArray = createMetadataParams(prototypeMetadata, argArray);
                  // before 处理参数
                  argArray = compose(...before.map(it => it.metadataFactory))(
                    argArray,
                  );
                  let result = Reflect.apply(tar, thisArg, argArray);
                  // after 处理结果
                  return compose(...after.map(it => it.metadataFactory))(
                    result,
                  );
                },
              });
            } else {
              return compose(
                ...prototypeMetadata.map(it => it.metadataFactory),
              )(res);
            }
          },
        });
      },
    });
  }
}
export function injector(visitor: Visitor = new Visitor()) {
  return (type: Type<any>, ...args: any[]) => {
    return visitor.forkJoin().pipe(
      concatMap(() => {
        let Target = visitor.visitType(type);
        let instance = new Target(...args);
        if (isFunction(instance.onInit)) {
          let res = instance.onInit();
          if (isPromise(res)) return from(res).pipe(map(() => instance));
          else if (isObservable(res)) return res.pipe(map(() => instance));
          else of(instance);
        }
        return of(instance);
      }),
    );
  };
}
