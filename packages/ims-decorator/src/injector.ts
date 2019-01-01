import { Type } from 'ims-core';
import {
  getMetadata,
  isClassMetadata,
  MetadataDef,
  isPropertyMetadata,
  isMethodMetadata,
  isParameterMetadata,
} from './metadata';
import { createDecoratorConstructor } from './createDecorator';
import { isNullOrUndefined, compose } from 'ims-util';
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
  visit(it: MetadataDef<any>, parent: any, context: any) {
    if (it.visit && this[it.visit]) return this[it.visit](it, parent, context);
    return it;
  }
  visitType(
    type: Type<any>,
    parent: any,
    context: any,
    options: any = {},
    ...args: any[]
  ) {
    let meta = getMetadata(type);
    meta = meta
      .filter(it => isClassMetadata(it))
      .map(it => {
        it.metadataDef = {
          ...it.metadataDef,
          ...options,
        };
        return this.visit(it, parent, type);
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
  }

  visitPrototype(type: Type<any>, parent: any, context: any, key: any) {
    let meta = getMetadata(type);
    let factorys = [];
    meta.filter(it => {
      if (isPropertyMetadata(it)) {
        if (it.propertyKey === key) {
          let me: MetadataDef<any> = this.visit(it, parent, context);
          if (me.metadataFactory) {
            factorys.push(me.metadataFactory.bind(context));
          }
        }
      }
    });
    if (factorys.length > 0) {
      try {
        context[key] = compose(...factorys)(context[key] || undefined);
      } catch (err) {
        compose(...factorys)(context[key] || undefined);
      }
    }
  }

  visitMethod(type: Type<any>, parent: any, context: any, key: any) {
    const factorys: any[] = [];
    const afters: any[] = [];
    const befores: any[] = [];
    const defaults: any[] = [];
    const metadata = getMetadata(type);
    metadata
      .filter(meta => isMethodMetadata(meta) && meta.propertyKey === key)
      .map(it => {
        it = this.visit(it, parent, context);
        if (isMethodMetadata(it)) {
          if (it.metadataFactory) {
            factorys.push(it.metadataFactory.bind(context));
            if (it.methodRuntime === 'after') {
              afters.push(it.metadataFactory.bind(context));
            } else if (it.methodRuntime === 'before') {
              befores.push(it.metadataFactory.bind(context));
            } else {
              defaults.push(it.metadataFactory.bind(context));
            }
          }
        }
      });
    if (factorys.length > 0) {
      const oldMethod = context[key];
      if (oldMethod) {
        const newMethod = (...args: any[]) => {
          args = this.visitParams(args)(type, parent, context);
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
          compose(...defaults)(oldMethod.bind(context));
        }
        context[key] = newMethod;
      }
    }
  }

  visitParams(args: any[]) {
    return (type: Type<any>, parent: any, that: any) => {
      const metadata = getMetadata(type);
      const item: { [key: number]: any[] } = {};
      metadata
        .filter(meta => isParameterMetadata(meta))
        .map(it => {
          it = this.visit(it, parent, that);
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

  visitTypeMetadataKey(
    type: Type<any>,
    parent: any,
    context: any,
    metadataKey: string,
  ) {
    let meta = getMetadata(type);
    meta.map(it => {
      if (it.metadataKey === metadataKey) {
        if (isPropertyMetadata(it)) {
          this.visitPrototype(type, parent, context, it.propertyKey);
        }
        if (isMethodMetadata(it)) {
          this.visitMethod(type, parent, context, it.propertyKey);
        }
      }
    });
  }

  visitTypeOther(type: Type<any>, parent: any, context: any) {
    let meta = getMetadata(type);
    let keys = [];
    meta.map(it => {
      if (isPropertyMetadata(it)) {
        if (!keys.includes(it.propertyKey)) {
          keys.push(it.propertyKey);
          this.visitPrototype(type, parent, context, it.propertyKey);
        }
      }
      if (isMethodMetadata(it)) {
        if (!keys.includes(it.propertyKey)) {
          keys.push(it.propertyKey);
          this.visitMethod(type, parent, context, it.propertyKey);
        }
      }
    });
  }
}
export function injector<T extends Visitor>(visitor: T) {
  return <T = any>(
    type: Type<any>,
    meta: any = {},
    ...args: any[]
  ): Observable<T> => {
    let instance = visitor.visitType(type, null, null, meta, ...args);
    return visitor.forkJoin().pipe(map(() => instance));
  };
}
