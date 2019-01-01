import { MetadataDef, getMetadata, isClassMetadata } from './metadata';
import { Type } from 'ims-core';
import { forkJoin, Observable, of, from, isObservable } from 'rxjs';
import { isNullOrUndefined, compose, isPromise } from 'ims-util';
import { createDecoratorConstructor } from './createDecorator';
import { switchMap } from 'rxjs/operators';

export class Visitor2 {
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

  visit(it: MetadataDef<any>, parent: any, context: any) {
    if (it.visit && this[it.visit]) return this[it.visit](it, parent, context);
    return it;
  }

  visitType(type: Type<any>, parent: any, context: any, options: any = {}) {
    let meta = getMetadata(type);
    meta = meta.map(it => {
      it.metadataDef = {
        ...it.metadataDef,
        ...options,
      };
      return this.visit(it, parent, context);
    });
    return meta;
  }
}

export function injector2<T extends Visitor2>(visitor: T) {
  return (type: Type<any>, meta: any = {}, ...args: any[]): Observable<any> => {
    let metas = visitor.visitType(type, null, null, meta);
    let instance = createType(type, metas, ...args);
    return visitor.forkJoin().pipe(
      switchMap(() => {
        if (instance.onInit) {
          let res = instance.onInit();
          if (isPromise(res)) {
            return from(instance.onInit());
          } else if (isObservable(res)) {
            return instance.onInit();
          } else {
            return of(res);
          }
        } else {
          return of(null);
        }
      }),
    );
  };
}

function createType(type: Type<any>, meta: MetadataDef<any>[], ...args: any[]) {
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
  return new Target(args);
}
