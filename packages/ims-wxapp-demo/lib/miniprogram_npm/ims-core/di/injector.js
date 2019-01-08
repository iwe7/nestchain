"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _THROW_IF_NOT_FOUND = new Object();
const ims_util_1 = require("ims-util");
const injection_token_1 = require("./injection_token");
const defs_1 = require("./defs");
const inject_1 = require("./inject");
const forward_ref_1 = require("./forward_ref");
const metadata_1 = require("./metadata");
class NullInjector {
    get(token, notFoundValue = _THROW_IF_NOT_FOUND) {
        if (notFoundValue === _THROW_IF_NOT_FOUND) {
            throw new Error(`NullInjectorError: No provider for ${ims_util_1.stringify(token)}!`);
        }
        return notFoundValue;
    }
    set(providers) { }
}
exports.NullInjector = NullInjector;
var InjectFlags;
(function (InjectFlags) {
    InjectFlags[InjectFlags["Default"] = 0] = "Default";
    InjectFlags[InjectFlags["Host"] = 1] = "Host";
    InjectFlags[InjectFlags["Self"] = 2] = "Self";
    InjectFlags[InjectFlags["SkipSelf"] = 4] = "SkipSelf";
    InjectFlags[InjectFlags["Optional"] = 8] = "Optional";
})(InjectFlags = exports.InjectFlags || (exports.InjectFlags = {}));
exports.INJECTOR = new injection_token_1.InjectionToken('INJECTOR');
class StaticInjector {
    constructor(providers, parent = Injector.top, source = null) {
        this.parent = parent;
        this.source = source;
        const records = (this._records = new Map());
        records.set(Injector, {
            token: Injector,
            fn: function (value) {
                return value;
            },
            deps: [],
            value: this,
            useNew: false,
        });
        records.set(exports.INJECTOR, {
            token: exports.INJECTOR,
            fn: function (value) {
                return value;
            },
            deps: [],
            value: this,
            useNew: false,
        });
        recursivelyProcessProviders(records, providers);
    }
    set(providers) {
        recursivelyProcessProviders(this._records, providers);
    }
    get(token, notFoundValue, flags = InjectFlags.Default) {
        const record = this._records.get(token);
        try {
            return tryResolveToken(token, record, this._records, this.parent, notFoundValue, flags);
        }
        catch (e) {
            const tokenPath = e[NG_TEMP_TOKEN_PATH];
            if (token[exports.SOURCE]) {
                tokenPath.unshift(token[exports.SOURCE]);
            }
            e.message = ims_util_1.formatError('\n' + e.message, tokenPath, this.source);
            e[NG_TOKEN_PATH] = tokenPath;
            e[NG_TEMP_TOKEN_PATH] = null;
            throw e;
        }
    }
    toString() {
        const tokens = [], records = this._records;
        records.forEach((v, token) => tokens.push(ims_util_1.stringify(token)));
        return `StaticInjector[${tokens.join(', ')}]`;
    }
}
exports.StaticInjector = StaticInjector;
class Injector {
    static create(options, parent) {
        let injector;
        if (Array.isArray(options)) {
            injector = new StaticInjector(options, parent);
        }
        else {
            injector = new StaticInjector(options.providers, options.parent, options.name || null);
        }
        inject_1.setCurrentInjector(injector);
        return injector;
    }
}
Injector.THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
Injector.NULL = new NullInjector();
Injector.top = new StaticInjector([], Injector.NULL, 'top');
Injector.ngInjectableDef = defs_1.defineInjectable({
    providedIn: 'any',
    factory: () => inject_1.inject(exports.INJECTOR),
});
exports.Injector = Injector;
const NULL_INJECTOR = Injector.NULL;
const IDENT = function (value) {
    return value;
};
const EMPTY = [];
const NG_TOKEN_PATH = 'ngTokenPath';
const NG_TEMP_TOKEN_PATH = 'ngTempTokenPath';
exports.SOURCE = '__source';
const MULTI_PROVIDER_FN = function () {
    return Array.prototype.slice.call(arguments);
};
function multiProviderMixError(token) {
    return ims_util_1.staticError('Cannot mix multi providers and regular providers', token);
}
function recursivelyProcessProviders(records, provider) {
    if (provider) {
        provider = forward_ref_1.resolveForwardRef(provider);
        if (provider instanceof Array) {
            for (let i = 0; i < provider.length; i++) {
                recursivelyProcessProviders(records, provider[i]);
            }
        }
        else if (typeof provider === 'function') {
            throw ims_util_1.staticError('Function/Class not supported', provider);
        }
        else if (provider && typeof provider === 'object' && provider.provide) {
            let token = forward_ref_1.resolveForwardRef(provider.provide);
            const resolvedProvider = resolveProvider(provider);
            if (provider.multi === true) {
                let multiProvider = records.get(token);
                if (multiProvider) {
                    if (multiProvider.fn !== MULTI_PROVIDER_FN) {
                        throw multiProviderMixError(token);
                    }
                }
                else {
                    records.set(token, (multiProvider = {
                        token: provider.provide,
                        deps: [],
                        useNew: false,
                        fn: MULTI_PROVIDER_FN,
                        value: EMPTY,
                    }));
                }
                token = provider;
                multiProvider.deps.push({ token, options: 6 });
            }
            const record = records.get(token);
            if (record && record.fn == MULTI_PROVIDER_FN) {
                throw multiProviderMixError(token);
            }
            records.set(token, resolvedProvider);
        }
        else {
            throw ims_util_1.staticError('Unexpected provider', provider);
        }
    }
}
exports.USE_VALUE = ims_util_1.getClosureSafeProperty({
    provide: String,
    useValue: ims_util_1.getClosureSafeProperty,
});
function resolveProvider(provider) {
    const deps = computeDeps(provider);
    let fn = IDENT;
    let value = EMPTY;
    let useNew = false;
    let provide = forward_ref_1.resolveForwardRef(provider.provide);
    if (exports.USE_VALUE in provider) {
        value = provider.useValue;
    }
    else if (provider.useFactory) {
        fn = provider.useFactory;
    }
    else if (provider.useExisting) {
    }
    else if (provider.useClass) {
        useNew = true;
        fn = forward_ref_1.resolveForwardRef(provider.useClass);
    }
    else if (typeof provide == 'function') {
        useNew = true;
        fn = provide;
    }
    else {
        throw ims_util_1.staticError('StaticProvider does not have [useValue|useFactory|useExisting|useClass] or [provide] is not newable', provider);
    }
    return { deps, fn, useNew, value };
}
function computeDeps(provider) {
    let deps = EMPTY;
    const providerDeps = provider.deps;
    if (providerDeps && providerDeps.length) {
        deps = [];
        for (let i = 0; i < providerDeps.length; i++) {
            let options = 6;
            let token = forward_ref_1.resolveForwardRef(providerDeps[i]);
            if (token instanceof Array) {
                for (let j = 0, annotations = token; j < annotations.length; j++) {
                    const annotation = annotations[j];
                    if (annotation instanceof metadata_1.Optional || annotation == metadata_1.Optional) {
                        options = options | 1;
                    }
                    else if (annotation instanceof metadata_1.SkipSelf || annotation == metadata_1.SkipSelf) {
                        options = options & ~2;
                    }
                    else if (annotation instanceof metadata_1.Self || annotation == metadata_1.Self) {
                        options = options & ~4;
                    }
                    else if (annotation instanceof metadata_1.Inject) {
                        token = annotation.token;
                    }
                    else {
                        token = forward_ref_1.resolveForwardRef(annotation);
                    }
                }
            }
            deps.push({ token, options });
        }
    }
    else if (provider.useExisting) {
        const token = forward_ref_1.resolveForwardRef(provider.useExisting);
        deps = [{ token, options: 6 }];
    }
    else if (!providerDeps && !(exports.USE_VALUE in provider)) {
        throw ims_util_1.staticError("'deps' required", provider);
    }
    return deps;
}
const CIRCULAR = IDENT;
function tryResolveToken(token, record, records, parent, notFoundValue, flags) {
    try {
        return resolveToken(token, record, records, parent, notFoundValue, flags);
    }
    catch (e) {
        if (!(e instanceof Error)) {
            e = new Error(e);
        }
        const path = (e[NG_TEMP_TOKEN_PATH] = e[NG_TEMP_TOKEN_PATH] || []);
        path.unshift(token);
        if (record && record.value == CIRCULAR) {
            record.value = EMPTY;
        }
        throw e;
    }
}
const NO_NEW_LINE = 'ɵ';
function resolveToken(token, record, records, parent, notFoundValue, flags) {
    let value;
    if (record && !(flags & InjectFlags.SkipSelf)) {
        value = record.value;
        if (value == CIRCULAR) {
            throw Error(NO_NEW_LINE + 'Circular dependency');
        }
        else if (value === EMPTY) {
            record.value = CIRCULAR;
            let obj = undefined;
            let useNew = record.useNew;
            let fn = record.fn;
            let depRecords = record.deps;
            let deps = EMPTY;
            if (depRecords.length) {
                deps = [];
                for (let i = 0; i < depRecords.length; i++) {
                    const depRecord = depRecords[i];
                    const options = depRecord.options;
                    const childRecord = options & 2
                        ? records.get(depRecord.token)
                        : undefined;
                    deps.push(tryResolveToken(depRecord.token, childRecord, records, !childRecord && !(options & 4)
                        ? NULL_INJECTOR
                        : parent, options & 1
                        ? null
                        : Injector.THROW_IF_NOT_FOUND, InjectFlags.Default));
                }
            }
            record.value = value = useNew
                ? new fn(...deps)
                : fn.apply(obj, deps);
        }
    }
    else if (!(flags & InjectFlags.Self)) {
        value = parent.get(token, notFoundValue, InjectFlags.Default);
    }
    return value;
}
