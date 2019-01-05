import {
  makeDecorator,
  isClassMetadata,
  getMetadata,
  isConstructorMetadata,
  ConstructorMetadata,
  TypeDecorator,
  MetadataDef,
  getDesignParamTypes,
  ParameterMetadata,
  isParameterMetadata,
  isMethodMetadata,
} from 'ims-decorator';
import { Type } from 'ims-core';
import { inject, InjectFlags } from './injector_compatibility';
import {
  OptionalMetadataKey,
  SkipSelfMetadataKey,
  SelfMetadataKey,
  HostMetadataKey,
  InjectMetadataKey,
  InjectOptions,
} from './metadata';
import {
  ValueSansProvider,
  ExistingSansProvider,
  StaticClassSansProvider,
  ConstructorSansProvider,
  FactorySansProvider,
  ClassSansProvider,
} from './provider';
import { InjectionToken } from './injection_token';
import { getClosureSafeProperty } from 'ims-util';
import { InjectorType } from './injector';

export type InjectableProvider =
  | ValueSansProvider
  | ExistingSansProvider
  | StaticClassSansProvider
  | ConstructorSansProvider
  | FactorySansProvider
  | ClassSansProvider;

export type InjectableOptions = {
  providedIn: Type<any> | 'root' | null;
} & InjectableProvider;

export const NG_INJECTABLE_DEF = getClosureSafeProperty({
  ngInjectableDef: getClosureSafeProperty,
});

export interface Injectable {
  providedIn: Type<any> | 'root' | null;
}

export interface InjectableType<T> extends Type<T> {
  ngInjectableDef: never;
}

export interface InjectableDef<T> {
  providedIn: InjectorType<any> | 'root' | 'any' | null;
  factory: () => T;
  value: T | undefined;
}

export function defineInjectable<T>(opts: {
  providedIn?: Type<any> | 'root' | 'any' | null;
  factory: () => T;
}): never {
  return ({
    providedIn: (opts.providedIn as any) || null,
    factory: opts.factory,
    value: undefined,
  } as InjectableDef<T>) as never;
}

export function getInjectableDef<T>(type: any): InjectableDef<T> | null {
  return type && type.hasOwnProperty(NG_INJECTABLE_DEF)
    ? (type as any)[NG_INJECTABLE_DEF]
    : null;
}

export interface InjectableDecorator {
  (opt?: InjectableOptions): TypeDecorator;
  new (opt?: InjectableOptions): TypeDecorator;
  (opt?: InjectableOptions): Injectable;
  new (opt?: InjectableOptions): Injectable;
}

export const InjectableMetadataKey = 'InjectableMetadataKey';
export const Injectable: InjectableDecorator = makeDecorator(
  InjectableMetadataKey,
  'visitInjectable',
  dir => dir,
);

export class NgInjectableDef {
  get factory() {
    let parameters = createInjectableTypeParamters(this.type);
    return () => new this.type(...parameters);
  }
  get providedIn() {
    return this._providedIn;
  }
  type: Type<any>;
  constructor(type: Type<any>, private _providedIn: Type<any> | 'root' | null) {
    this.type = parseTypeMethod(type);
  }
}

export function createInjectableTypeParamters(type: Type<any>) {
  let meta = getMetadata(type);
  let classMeta = meta.find(it => isClassMetadata(it));
  let contructorMeta = meta.filter(it => isConstructorMetadata(it));
  let parameters = [];
  let args: any[] = [];
  if (classMeta) {
    parameters = classMeta.parameters;
    args = new Array(parameters.length);
  } else {
    parameters = getDesignParamTypes(type);
    args = new Array(parameters.length);
  }
  for (let i = 0; i < args.length; i++) {
    let ctor = contructorMeta.find(
      (it: ConstructorMetadata) => it.parameterIndex === i,
    );
    if (ctor) {
      if (ctor.metadataKey === OptionalMetadataKey) {
        args[i] = inject(parameters[i], InjectFlags.Optional);
      } else if (ctor.metadataKey === SkipSelfMetadataKey) {
        args[i] = inject(parameters[i], InjectFlags.SkipSelf);
      } else if (ctor.metadataKey === SelfMetadataKey) {
        args[i] = inject(parameters[i], InjectFlags.Self);
      } else if (ctor.metadataKey === HostMetadataKey) {
        args[i] = inject(parameters[i], InjectFlags.Host);
      } else if (ctor.metadataKey === InjectMetadataKey) {
        let options: InjectOptions = ctor.metadataDef as any;
        args[i] = inject(options.token);
      } else {
        args[i] = inject(parameters[i]);
      }
    } else {
      args[i] = inject(parameters[i]);
    }
  }
  return args;
}

export function parseTypeMethod(type: Type<any>) {
  let meta = getMetadata(type);
  meta.forEach(parent => {
    if (isMethodMetadata(parent)) {
      let parametersMetadata: ParameterMetadata<any>[] = meta.filter(
        me => isParameterMetadata(me) && me.propertyKey === parent.propertyKey,
      ) as any;
      let parameters = parent.parameters.map((it, index) => {
        let meta: ParameterMetadata<any> = parametersMetadata.find(
          par => par.parameterIndex === index,
        );
        if (meta.visit instanceof InjectionToken) {
          return inject(meta.visit);
        } else {
          return inject(it);
        }
      });
      let old = type.prototype[parent.propertyKey];
      type.prototype[parent.propertyKey] = () => old(...parameters);
    }
  });
  return type;
}
