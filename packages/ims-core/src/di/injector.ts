import {
  stringify,
  formatError,
  staticError,
  getClosureSafeProperty,
  isPromise,
} from '../util/index';
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
import { inject, setCurrentInjector } from './inject';
import { resolveForwardRef } from './forward_ref';
import { Optional, SkipSelf, Self, Inject } from './metadata';
import {
  Observable,
  of,
  Subject,
  combineLatest,
  BehaviorSubject,
  from,
  forkJoin,
} from 'ims-rxjs';
import { filter, merge, map } from 'ims-rxjs/operators';

export class NullInjector implements Injector {
  get(token: any, notFoundValue: any = Injector.createNull()): any {
    if (token instanceof InjectionToken) {
      console.log(`not found token ${stringify(token)}`);
      if (token.notFound) return token.notFound;
    }
    return notFoundValue;
  }
  set(providers: StaticProvider | StaticProvider[]): any {}
  init(): Promise<void> {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
  when(tokens: any): Observable<Record[]> {
    return of([]);
  }
}
export enum InjectFlags {
  Default = 0b0000,
  Host = 0b0001,
  Self = 0b0010,
  SkipSelf = 0b0100,
  Optional = 0b1000,
}
export const INJECTOR = new InjectionToken<Injector>('INJECTOR');
export abstract class Injector {
  static THROW_IF_NOT_FOUND = Injector.createNull();
  static NULL: Injector = new NullInjector();
  static top: Injector;
  static isNull(val: any): boolean {
    return (
      val === null ||
      val === undefined ||
      JSON.stringify(val) === JSON.stringify({}) ||
      JSON.stringify(val) === JSON.stringify([]) ||
      !!val[Symbol.for('isNullInjector')]
    );
  }
  static createNull<T>(): T {
    return new Proxy(function() {}, {
      get(target: any, p: PropertyKey, receiver: any): any {
        if (p === Symbol.for('isNullInjector')) return true;
      },
    });
  }
  constructor() {}
  abstract when(tokens: any): Observable<Record[]>;
  abstract set(providers: StaticProvider | StaticProvider[]): void;
  abstract get<T>(
    token: Type<T> | InjectionToken<T>,
    notFoundValue?: T,
    flags?: InjectFlags,
  ): T;
  /**
   * @deprecated from v4.0.0 use Type<T> or InjectionToken<T>
   * @suppress {duplicate}
   */
  abstract get<T>(token: any, notFoundValue?: any): T;
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
    parent: Injector = Injector.top,
  ): Injector {
    let injector: Injector = Injector.NULL;
    if (Array.isArray(options)) {
      injector = new StaticInjector(options, parent);
    } else {
      if (options) {
        injector = new StaticInjector(
          options.providers,
          options.parent || Injector.top,
          options.name || null,
        );
      } else {
        throw new Error(`injector create options is undefined`);
      }
    }
    return injector;
  }

  static ngInjectableDef = defineInjectable({
    providedIn: 'any' as any,
    factory: () => inject(INJECTOR),
  });
}
export class StaticInjector implements Injector {
  readonly parent: Injector;
  readonly source: string | null;
  public _records: Map<any, Record>;
  constructor(
    private providers: StaticProvider[],
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
      useCache: true,
    });
    records.set(INJECTOR, <Record>{
      token: INJECTOR,
      fn: function<T>(value: T): T {
        return value;
      },
      deps: [],
      value: this,
      useNew: false,
      useCache: true,
    });
    setCurrentInjector(this);
    if (this.providers.length > 0) {
      this.processProviders(this.providers);
    }
  }

  private loaded: Subject<{
    token: any;
    provider: StaticProvider;
  }> = new Subject();
  private getCurrent(token: any): Record[] {
    let hasLoaded = [];
    if (this.parent) {
      if ((this.parent as any).getCurrent) {
        hasLoaded.concat(...(this.parent as any).getCurrent(token));
      }
    }
    this._records.forEach((it, key) => {
      if (key === token) {
        hasLoaded.push(it);
      }
    });
    return hasLoaded;
  }
  private getLoaded(token: any) {
    let loaded = this.loaded.pipe(filter(it => it.token === token));
    if (this.parent && (this.parent as any).getLoaded) {
      return combineLatest((this.parent as any).getLoaded(token), loaded);
    } else {
      return loaded;
    }
  }
  when(token: any): Observable<Record[]> {
    let subject = new BehaviorSubject([]);
    return subject.pipe(
      merge(this.getLoaded(token)),
      map(() => {
        return this.getCurrent(token);
      }),
    );
  }

  private emit(token: any, provider: StaticProvider) {
    this.loaded.next({ token, provider });
  }
  private processProviders(providers: StaticProvider[] | StaticProvider) {
    return recursivelyProcessProviders(
      this._records,
      providers,
      (token, provider) => {
        this.emit(token, provider);
      },
    );
  }
  set(providers: StaticProvider | StaticProvider[]): void {
    this.processProviders(providers);
  }
  get(
    token: any,
    notFoundValue?: any,
    flags: InjectFlags = InjectFlags.Default,
  ) {
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

Injector.top = new StaticInjector([], Injector.NULL, 'top');

const NULL_INJECTOR = Injector.NULL;
interface Record {
  fn: Function;
  useNew: boolean;
  useCache?: boolean;
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
  return staticError('添加multi:true', token);
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
  callback?: Function,
) {
  if (provider) {
    provider = resolveForwardRef(provider);
    if (provider instanceof Array) {
      for (let i = 0; i < provider.length; i++) {
        recursivelyProcessProviders(records, provider[i], callback);
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
        token = provider as any;
        // 父亲
        multiProvider.deps.push({
          token,
          options: OptionFlags.Default,
        });
      }
      const record = records.get(token);
      if (record && record.fn == MULTI_PROVIDER_FN) {
        throw multiProviderMixError(token);
      }
      records.set(token, resolvedProvider);
      callback && callback(token, resolvedProvider);
    } else if (provider && isPromise(provider)) {
      provider.then(pro => {
        recursivelyProcessProviders(records, pro, callback);
      });
    } else {
      throw staticError('Unexpected provider', provider);
    }
  }
}
export interface InjectorListener {
  (provider: any): any;
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
  let useCache: boolean = true;
  let provide = resolveForwardRef(provider.provide);
  if (USE_VALUE in provider) {
    value = (provider as ValueProvider).useValue;
  } else if ((provider as FactoryProvider).useFactory) {
    useCache = (provider as FactoryProvider).cache;
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
  return { deps, fn, useNew, useCache, value };
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
    return [];
    // throw staticError("'deps' required", provider);
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

async function resolveToken(
  token: any,
  record: Record | undefined,
  records: Map<any, Record>,
  parent: Injector,
  notFoundValue: any,
  flags: InjectFlags,
): Promise<any> {
  let value;
  if (record && !(flags & InjectFlags.SkipSelf)) {
    // If we don't have a record, this implies that we don't own the provider hence don't know how
    // to resolve it.
    value = record.value;
    if (value == CIRCULAR) {
      throw Error(NO_NEW_LINE + 'Circular dependency');
    } else if (value === EMPTY || !record.useCache) {
      record.value = CIRCULAR;
      let obj = undefined;
      let useNew = record.useNew;
      let fn = record.fn;
      let depRecords = record.deps;
      let deps = EMPTY;
      let lifs = [];
      if (depRecords.length) {
        deps = [];
        for (let i = 0; i < depRecords.length; i++) {
          const depRecord: DependencyRecord = depRecords[i];
          const options = depRecord.options;
          const childRecord =
            options & OptionFlags.CheckSelf
              ? records.get(depRecord.token)
              : undefined;
          lifs.push(
            from(
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
              ).then(res => deps.push(res)),
            ),
          );
        }
      }
      if (lifs.length > 0) {
        await forkJoin(...lifs).toPromise();
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
