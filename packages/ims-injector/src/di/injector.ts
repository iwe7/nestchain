import { getMetadata, isClassMetadata } from 'ims-decorator';
import { Type, isType } from 'ims-core';
import {
  stringify,
  staticError,
  formatError,
  getClosureSafeProperty,
} from 'ims-util';
import * as injectable from './injectable';
import { resolveForwardRef } from './forward_ref';
import { InjectionToken } from './injection_token';
import { InjectFlags, inject } from './injector_compatibility';
import {
  ConstructorProvider,
  ExistingProvider,
  FactoryProvider,
  StaticClassProvider,
  StaticProvider,
  ValueProvider,
  ClassProvider,
} from './provider';
import { USE_VALUE } from './const';
export const SOURCE = '__source';
const _THROW_IF_NOT_FOUND = new Object();
export const THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
export const INJECTOR = new InjectionToken<Injector>('INJECTOR');
export class NullInjector implements Injector {
  readonly parent: Injector;
  get(token: any, notFoundValue: any = _THROW_IF_NOT_FOUND): any {
    if (notFoundValue === _THROW_IF_NOT_FOUND) {
      throw new Error(
        `NullInjectorError: No provider for ${stringify(token)}!`,
      );
    }
    return notFoundValue;
  }
  set(provider: StaticProvider) {}
  getTop(): Injector {
    return undefined;
  }
}
export type InjectOf = StaticProvider | Type<any>;
export abstract class Injector {
  readonly parent: Injector;
  static THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
  static NULL: Injector = new NullInjector();
  abstract get<T>(
    token: Type<T> | InjectionToken<T>,
    notFoundValue?: T,
    flags?: InjectFlags,
  ): T;
  abstract get(token: any, notFoundValue?: any): any;
  abstract getTop(): Injector;
  abstract set(provider: StaticProvider): any;
  static create(providers: StaticProvider[], parent?: Injector): Injector;
  static create(options: {
    providers: StaticProvider[];
    parent?: Injector;
    name?: string;
  }): Injector;
  static create(
    options:
      | StaticProvider[]
      | { providers: StaticProvider[]; parent?: Injector; name?: string },
    parent?: Injector,
  ): Injector {
    if (Array.isArray(options)) {
      return new StaticInjector(options, parent);
    } else {
      return new StaticInjector(
        options.providers,
        options.parent,
        options.name || null,
      );
    }
  }
  static of(provides: InjectOf[], parent?: Injector) {
    let providers: StaticProvider[] = [];
    provides.forEach(provide => {
      if (isType(provide)) {
        let meta = getMetadata(provide).find(it => isClassMetadata(it));
        if (meta && meta.parameters) {
          providers.push({
            provide: provide,
            useClass: provide,
            deps: meta.parameters,
          });
        } else {
          providers.push({
            provide: provide,
            useClass: provide,
            deps: [],
          });
        }
      } else {
        providers.push(provide);
      }
    });
    return this.create(providers, parent);
  }
  static ngInjectableDef = injectable.defineInjectable({
    providedIn: 'any' as any,
    factory: () => inject(INJECTOR),
  });
}
const IDENT = function<T>(value: T): T {
  return value;
};
const EMPTY = <any[]>[];
const CIRCULAR = IDENT;
const MULTI_PROVIDER_FN = function(): any[] {
  return Array.prototype.slice.call(arguments);
};
const NG_TOKEN_PATH = 'ngTokenPath';
const NG_TEMP_TOKEN_PATH = 'ngTempTokenPath';
const enum OptionFlags {
  Optional = 1 << 0,
  CheckSelf = 1 << 1,
  CheckParent = 1 << 2,
  Default = CheckSelf | CheckParent,
}
const NULL_INJECTOR = Injector.NULL;
const NEW_LINE = /\n/gm;
const NO_NEW_LINE = 'ɵ';
export class StaticInjector implements Injector {
  readonly parent: Injector;
  readonly source: string | null;
  private _records: Map<any, Record>;
  constructor(
    providers: StaticProvider[],
    parent: Injector = NULL_INJECTOR,
    source: string | null = null,
  ) {
    this.parent = parent;
    this.source = source;
    const records = (this._records = new Map<any, Record>());
    records.set(Injector, <Record>{
      token: Injector,
      fn: IDENT,
      deps: EMPTY,
      value: this,
      useNew: false,
    });
    records.set(INJECTOR, <Record>{
      token: INJECTOR,
      fn: IDENT,
      deps: EMPTY,
      value: this,
      useNew: false,
    });
    recursivelyProcessProviders(records, providers);
  }
  /**
   * 设置
   * @param provider
   */
  set(provider: StaticProvider) {
    recursivelyProcessProviders(this._records, provider);
  }
  getTop(): Injector {
    let parent = this.parent;
    while (parent.parent) {
      parent = parent.parent;
    }
    return parent;
  }
  /**
   * 获取
   * @param token
   * @param notFoundValue
   * @param flags
   */
  get<T>(
    token: Type<T> | InjectionToken<T>,
    notFoundValue?: T,
    flags?: InjectFlags,
  ): T;
  get(token: any, notFoundValue?: any): any;
  get(
    token: any,
    notFoundValue?: any,
    flags: InjectFlags = InjectFlags.Default,
  ): any {
    const record = this._records.get(token);
    try {
      return tryResolveToken(
        token,
        record,
        this._records,
        this.parent,
        notFoundValue,
        flags,
      );
    } catch (e) {
      let inst = new token();
      if (!(inst instanceof InjectionToken)) {
        return inst;
      }
      const tokenPath: any[] = e[NG_TEMP_TOKEN_PATH];
      if (token[SOURCE]) {
        tokenPath.unshift(token[SOURCE]);
      }
      e.message = formatError('\n' + e.message, tokenPath, this.source);
      e[NG_TOKEN_PATH] = tokenPath;
      e[NG_TEMP_TOKEN_PATH] = null;
      throw e;
    }
  }

  toString() {
    const tokens = <string[]>[],
      records = this._records;
    records.forEach((v, token) => tokens.push(stringify(token)));
    return `StaticInjector[${tokens.join(', ')}]`;
  }
}
type SupportedProvider =
  | ValueProvider
  | ExistingProvider
  | StaticClassProvider
  | ConstructorProvider
  | FactoryProvider;
interface Record {
  fn: Function;
  useNew: boolean;
  deps: DependencyRecord[];
  value: any;
}
interface DependencyRecord {
  token: any;
  options: number;
}
function resolveProvider(provider: SupportedProvider): Record {
  const deps = computeDeps(provider);
  let fn: Function = IDENT;
  let value: any = EMPTY;
  let useNew: boolean = false;
  let provide = resolveForwardRef(provider.provide);
  debugger;
  if (USE_VALUE in provider) {
    value = (provider as ValueProvider).useValue;
  } else if ((provider as FactoryProvider).useFactory) {
    fn = (provider as FactoryProvider).useFactory;
  } else if ((provider as ExistingProvider).useExisting) {
  } else if ((provider as StaticClassProvider).useClass) {
    useNew = true;
    fn = resolveForwardRef((provider as StaticClassProvider).useClass);
    debugger;
  } else if (typeof provide == 'function') {
    useNew = true;
    fn = provide;
    debugger;
  } else {
    throw staticError(
      'StaticProvider does not have [useValue|useFactory|useExisting|useClass] or [provide] is not newable',
      provider,
    );
  }
  return { deps, fn, useNew, value };
}

function multiProviderMixError(token: any) {
  return staticError('Cannot mix multi providers and regular providers', token);
}

export function recursivelyProcessProviders(
  records: Map<any, Record>,
  provider: StaticProvider,
) {
  if (provider) {
    provider = resolveForwardRef(provider);
    if (provider instanceof Array) {
      for (let i = 0; i < provider.length; i++) {
        recursivelyProcessProviders(records, provider[i]);
      }
    } else if (typeof provider === 'function') {
      throw staticError('Function/Class not supported', provider);
    } else if (provider && typeof provider === 'object' && provider.provide) {
      let token = resolveForwardRef(provider.provide);
      const resolvedProvider = resolveProvider(provider);
      if (provider.multi === true) {
        let multiProvider: Record | undefined = records.get(token);
        if (multiProvider) {
          if (multiProvider.fn !== MULTI_PROVIDER_FN) {
            throw multiProviderMixError(token);
          }
        } else {
          records.set(
            token,
            (multiProvider = <Record>{
              token: provider.provide,
              deps: [],
              useNew: false,
              fn: MULTI_PROVIDER_FN,
              value: EMPTY,
            }),
          );
        }
        token = provider;
        multiProvider.deps.push({ token, options: OptionFlags.Default });
      }
      const record = records.get(token);
      if (record && record.fn == MULTI_PROVIDER_FN) {
        throw multiProviderMixError(token);
      }
      records.set(token, resolvedProvider);
    } else {
      throw staticError('Unexpected provider', provider);
    }
  }
}

function tryResolveToken(
  token: any,
  record: Record | undefined,
  records: Map<any, Record>,
  parent: Injector,
  notFoundValue: any,
  flags: InjectFlags,
): any {
  try {
    return resolveToken(token, record, records, parent, notFoundValue, flags);
  } catch (e) {
    if (!(e instanceof Error)) {
      e = new Error(e);
    }
    const path: any[] = (e[NG_TEMP_TOKEN_PATH] = e[NG_TEMP_TOKEN_PATH] || []);
    path.unshift(token);
    if (record && record.value == CIRCULAR) {
      record.value = EMPTY;
    }
    throw e;
  }
}
/**
 * 解析token
 * @param token
 * @param record
 * @param records
 * @param parent
 * @param notFoundValue
 * @param flags
 */
function resolveToken(
  token: any,
  record: Record | undefined,
  records: Map<any, Record>,
  parent: Injector,
  notFoundValue: any,
  flags: InjectFlags,
): any {
  let value;
  if (record && !(flags & InjectFlags.SkipSelf)) {
    value = record.value;
    if (value == CIRCULAR) {
      throw Error(NO_NEW_LINE + 'Circular dependency');
    } else if (value === EMPTY) {
      record.value = CIRCULAR;
      let obj = undefined;
      let useNew = record.useNew;
      let fn = record.fn;
      let depRecords = record.deps;
      let deps = EMPTY;
      if (depRecords.length) {
        deps = [];
        for (let i = 0; i < depRecords.length; i++) {
          const depRecord: DependencyRecord = depRecords[i];
          const options = depRecord.options;
          const childRecord =
            options & OptionFlags.CheckSelf
              ? records.get(depRecord.token)
              : undefined;
          deps.push(
            tryResolveToken(
              depRecord.token,
              childRecord,
              records,
              !childRecord && !(options & OptionFlags.CheckParent)
                ? NULL_INJECTOR
                : parent,
              options & OptionFlags.Optional
                ? null
                : Injector.THROW_IF_NOT_FOUND,
              InjectFlags.Default,
            ),
          );
        }
      }
      record.value = value = useNew
        ? new (fn as any)(...deps)
        : fn.apply(obj, deps);
    }
  } else if (!(flags & InjectFlags.Self)) {
    value = parent.get(token, notFoundValue, InjectFlags.Default);
  }
  return value;
}

function computeDeps(provider: StaticProvider): DependencyRecord[] {
  let deps: DependencyRecord[] = EMPTY;
  const providerDeps: any[] = (provider as ExistingProvider &
    StaticClassProvider &
    ConstructorProvider).deps;
  if (providerDeps && providerDeps.length) {
    deps = [];
    for (let i = 0; i < providerDeps.length; i++) {
      let options = OptionFlags.Default;
      let token = resolveForwardRef(providerDeps[i]);
      if (Array.isArray(token)) {
        throw new Error('todo injector.ts');
      }
      deps.push({ token, options });
    }
  } else if ((provider as ExistingProvider).useExisting) {
    const token = resolveForwardRef((provider as ExistingProvider).useExisting);
    deps = [{ token, options: OptionFlags.Default }];
  } else if (!providerDeps && !(USE_VALUE in provider)) {
    throw staticError("'deps' required", provider);
  }
  return deps;
}

/**
 * injector
 */
export const NG_INJECTOR_DEF = getClosureSafeProperty({
  ngInjectorDef: getClosureSafeProperty,
});
export interface InjectorType<T> extends Type<T> {
  ngInjectorDef: never;
}

export interface InjectorTypeWithProviders<T> {
  ngModule: InjectorType<T>;
  providers?: (
    | Type<any>
    | ValueProvider
    | ExistingProvider
    | FactoryProvider
    | ConstructorProvider
    | StaticClassProvider
    | ClassProvider
    | any[])[];
}

export interface InjectorDef<T> {
  factory: () => T;
  providers: (
    | Type<any>
    | ValueProvider
    | ExistingProvider
    | FactoryProvider
    | ConstructorProvider
    | StaticClassProvider
    | ClassProvider
    | any[])[];
  imports: (InjectorType<any> | InjectorTypeWithProviders<any>)[];
}

export function defineInjector(options: {
  factory: () => any;
  providers?: any[];
  imports?: any[];
}): never {
  return ({
    factory: options.factory,
    providers: options.providers || [],
    imports: options.imports || [],
  } as InjectorDef<any>) as never;
}

export function getInjectorDef<T>(type: any): InjectorDef<T> | null {
  return type && type.hasOwnProperty(NG_INJECTOR_DEF)
    ? (type as any)[NG_INJECTOR_DEF]
    : null;
}
