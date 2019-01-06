const _THROW_IF_NOT_FOUND = new Object();
import {
  stringify,
  formatError,
  staticError,
  getClosureSafeProperty,
} from 'ims-util';
import { Type } from '../type';
import { InjectionToken } from './injection_token';
import {
  StaticProvider,
  ValueProvider,
  ExistingProvider,
  StaticClassProvider,
  ConstructorProvider,
  FactoryProvider,
} from './provider';
import { defineInjectable } from './defs';
import { inject } from './inject';
import { resolveForwardRef } from './forward_ref';
import { Optional, SkipSelf, Self, Inject } from './metadata';

export class NullInjector implements Injector {
  get(token: any, notFoundValue: any = _THROW_IF_NOT_FOUND): any {
    if (notFoundValue === _THROW_IF_NOT_FOUND) {
      throw new Error(
        `NullInjectorError: No provider for ${stringify(token)}!`,
      );
    }
    return notFoundValue;
  }
  set(providers: StaticProvider[]): any {}
}
export enum InjectFlags {
  Default = 0b0000,
  Host = 0b0001,
  Self = 0b0010,
  SkipSelf = 0b0100,
  Optional = 0b1000,
}
export const INJECTOR = new InjectionToken<Injector>('INJECTOR');
export class StaticInjector implements Injector {
  readonly parent: Injector;
  readonly source: string | null;

  private _records: Map<any, Record>;

  constructor(
    providers: StaticProvider[],
    parent: Injector = Injector.top,
    source: string | null = null,
  ) {
    this.parent = parent;
    this.source = source;
    const records = (this._records = new Map<any, Record>());
    records.set(Injector, <Record>{
      token: Injector,
      fn: function<T>(value: T): T {
        return value;
      },
      deps: [],
      value: this,
      useNew: false,
    });
    records.set(INJECTOR, <Record>{
      token: INJECTOR,
      fn: function<T>(value: T): T {
        return value;
      },
      deps: [],
      value: this,
      useNew: false,
    });
    // 注册record
    recursivelyProcessProviders(records, providers);
  }

  set(providers: StaticProvider[]) {
    recursivelyProcessProviders(this._records, providers);
  }

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
export abstract class Injector {
  static THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
  static NULL: Injector = new NullInjector();
  static top: Injector = new StaticInjector([], Injector.NULL, 'top');
  abstract set(providers: StaticProvider[]): any;
  abstract get<T>(
    token: Type<T> | InjectionToken<T>,
    notFoundValue?: T,
    flags?: InjectFlags,
  ): T;
  /**
   * @deprecated from v4.0.0 use Type<T> or InjectionToken<T>
   * @suppress {duplicate}
   */
  abstract get(token: any, notFoundValue?: any): any;

  /**
   * @deprecated from v5 use the new signature Injector.create(options)
   */
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

  static ngInjectableDef = defineInjectable({
    providedIn: 'any' as any,
    factory: () => inject(INJECTOR),
  });
}

const NULL_INJECTOR = Injector.NULL;
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
const IDENT = function<T>(value: T): T {
  return value;
};

const EMPTY = <any[]>[];
const NG_TOKEN_PATH = 'ngTokenPath';
const NG_TEMP_TOKEN_PATH = 'ngTempTokenPath';
export const SOURCE = '__source';

// doto
const MULTI_PROVIDER_FN = function(): any[] {
  return Array.prototype.slice.call(arguments);
};
function multiProviderMixError(token: any) {
  return staticError('Cannot mix multi providers and regular providers', token);
}
const enum OptionFlags {
  Optional = 1 << 0,
  CheckSelf = 1 << 1,
  CheckParent = 1 << 2,
  Default = CheckSelf | CheckParent,
}
function recursivelyProcessProviders(
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
        // Treat the provider as the token.
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
export const USE_VALUE = getClosureSafeProperty<ValueProvider>({
  provide: String,
  useValue: getClosureSafeProperty,
});
type SupportedProvider =
  | ValueProvider
  | ExistingProvider
  | StaticClassProvider
  | ConstructorProvider
  | FactoryProvider;
function resolveProvider(provider: SupportedProvider): Record {
  const deps = computeDeps(provider);
  let fn: Function = IDENT;
  let value: any = EMPTY;
  let useNew: boolean = false;
  let provide = resolveForwardRef(provider.provide);
  if (USE_VALUE in provider) {
    value = (provider as ValueProvider).useValue;
  } else if ((provider as FactoryProvider).useFactory) {
    fn = (provider as FactoryProvider).useFactory;
  } else if ((provider as ExistingProvider).useExisting) {
    // Just use IDENT
  } else if ((provider as StaticClassProvider).useClass) {
    useNew = true;
    fn = resolveForwardRef((provider as StaticClassProvider).useClass);
  } else if (typeof provide == 'function') {
    useNew = true;
    fn = provide;
  } else {
    throw staticError(
      'StaticProvider does not have [useValue|useFactory|useExisting|useClass] or [provide] is not newable',
      provider,
    );
  }
  return { deps, fn, useNew, value };
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
      if (token instanceof Array) {
        for (let j = 0, annotations = token; j < annotations.length; j++) {
          const annotation = annotations[j];
          if (annotation instanceof Optional || annotation == Optional) {
            options = options | OptionFlags.Optional;
          } else if (annotation instanceof SkipSelf || annotation == SkipSelf) {
            options = options & ~OptionFlags.CheckSelf;
          } else if (annotation instanceof Self || annotation == Self) {
            options = options & ~OptionFlags.CheckParent;
          } else if (annotation instanceof Inject) {
            token = (annotation as Inject).token;
          } else {
            token = resolveForwardRef(annotation);
          }
        }
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
const CIRCULAR = IDENT;

function tryResolveToken(
  token: any,
  record: Record | undefined,
  records: Map<any, Record>,
  parent: Injector,
  notFoundValue: any,
  flags: InjectFlags,
) {
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
const NO_NEW_LINE = 'ɵ';

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
    // If we don't have a record, this implies that we don't own the provider hence don't know how
    // to resolve it.
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
