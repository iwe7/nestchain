import {
  makeDecorator,
  isClassMetadata,
  getMetadata,
  isConstructorMetadata,
  ConstructorMetadata,
  TypeDecorator,
  MetadataDef,
  getDesignParamTypes,
} from 'ims-decorator';
import { Type } from 'ims-core';
import { inject, InjectFlags, injectArgs } from './injector_compatibility';
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

export interface Injectable {}
export interface InjectableDecorator {
  (opt: InjectableOptions): TypeDecorator;
  new (opt?: InjectableOptions): TypeDecorator;
  (opt?: InjectableOptions): Injectable;
  new (opt?: InjectableOptions): Injectable;
}
export const InjectableMetadataKey = 'InjectableMetadataKey';
export const Injectable: InjectableDecorator = makeDecorator(
  InjectableMetadataKey,
  'visitInjectable',
  dir => dir,
  (type: Type<any>, opt: MetadataDef<InjectableOptions>) => {
    const options = opt.metadataDef;
    Object.defineProperty(type, 'ngInjectableDef', {
      get: () => new NgInjectableDef(type, options.providedIn),
    });
  },
);

export class NgInjectableDef {
  get factory() {
    let parameters = createInjectableTypeParamters(this.type);
    return () => new this.type(...parameters);
  }
  get providedIn() {
    return this._providedIn;
  }
  constructor(
    private type: Type<any>,
    private _providedIn: Type<any> | 'root' | null,
  ) {}
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
