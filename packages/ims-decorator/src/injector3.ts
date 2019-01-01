import { Type } from 'ims-core';
import {
  getMetadata,
  isConstructorMetadata,
  isClassMetadata,
  MetadataDef,
} from './metadata';
import {
  createMetadataType,
  createMetadataParams,
  getPrototypeMetadata,
} from './util';
import { isFunction } from 'util';
import { compose } from 'ims-util';
import { Observable, forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';
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
  visit(it: MetadataDef<any>, parent?: any, context?: any) {
    if (it.visit && this[it.visit]) return this[it.visit](it, parent, context);
    return it;
  }

  visitType(type: Type<any>) {
    const meta = getMetadata(type).map(it => this.visit(it));
    let classMetadata = meta.filter(it => isClassMetadata(it));
    let Target = createMetadataType(type, classMetadata);
    return new Proxy(type, {
      getPrototypeOf(tar: any): object | null {
        return Reflect.getPrototypeOf(Target);
      },
      setPrototypeOf(tar: any, v: any): boolean {
        return Reflect.setPrototypeOf(Target, v);
      },
      isExtensible(tar: any): boolean {
        return Reflect.isExtensible(Target);
      },
      preventExtensions(tar: any): boolean {
        return Reflect.preventExtensions(Target);
      },
      getOwnPropertyDescriptor(
        tar: any,
        p: PropertyKey,
      ): PropertyDescriptor | undefined {
        return Reflect.getOwnPropertyDescriptor(Target, p);
      },
      has(tar: any, p: PropertyKey): boolean {
        return Reflect.has(Target, p);
      },
      get(tar: any, p: PropertyKey, receiver: any): any {
        return Reflect.get(Target, p, receiver);
      },
      set(tar: any, p: PropertyKey, value: any, receiver: any): boolean {
        return Reflect.set(Target, p, value, receiver);
      },
      deleteProperty(tar: any, p: PropertyKey): boolean {
        return Reflect.deleteProperty(Target, p);
      },
      defineProperty(
        tar: any,
        p: PropertyKey,
        attributes: PropertyDescriptor,
      ): boolean {
        return Reflect.defineProperty(Target, p, attributes);
      },
      enumerate(tar: any): PropertyKey[] {
        return Reflect.enumerate(Target) as any;
      },
      ownKeys(tar: any): PropertyKey[] {
        return Reflect.ownKeys(Target);
      },
      apply(tar: any, thisArg: any, argArray?: any): any {
        return Reflect.apply(Target, thisArg, argArray);
      },
      construct(tar: any, argArray: any, newTarget?: any): object {
        let constructorMetadata = meta.filter(it => isConstructorMetadata(it));
        argArray = createMetadataParams(constructorMetadata, argArray);
        let instance = Reflect.construct(Target, argArray, newTarget);
        return new Proxy(instance, {
          get(tar: any, p: PropertyKey, receiver: any): any {
            let res = Reflect.get(tar, p, receiver);
            let prototypeMetadata = getPrototypeMetadata(meta, p);
            if (isFunction(res)) {
              return new Proxy(res, {
                apply(tar: any, thisArg: any, argArray?: any): any {
                  argArray = createMetadataParams(prototypeMetadata, argArray);
                  return Reflect.apply(tar, thisArg, argArray);
                },
              });
            } else {
              return compose(prototypeMetadata.map(it => it.metadataFactory))(
                res,
              );
            }
          },
        });
      },
    });
  }
}
export function injector(visitor: Visitor = new Visitor()) {
  return (type: Type<any>) => {
    return visitor.forkJoin().pipe(map(() => visitor.visitType(type)));
  };
}
