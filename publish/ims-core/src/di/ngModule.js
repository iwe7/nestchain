"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
const provider_1 = require("./provider");
const type_1 = require("../type");
const injector_1 = require("./injector");
const proxy_1 = require("./proxy");
const rxjs_1 = require("rxjs");
const ims_util_1 = require("ims-util");
function isModuleWithProviders(val) {
    return val.ngModule;
}
exports.isModuleWithProviders = isModuleWithProviders;
exports.NgModuleMetadataKey = 'NgModuleMetadataKey';
exports.NgModule = ims_decorator_1.makeDecorator(exports.NgModuleMetadataKey, 'visitNgModule');
class NgModuleRef {
}
exports.NgModuleRef = NgModuleRef;
class NgModuleFactory {
}
exports.NgModuleFactory = NgModuleFactory;
function createNgModuleFactory(ngModuleType, injector) {
    return new NgModuleFactory_(ngModuleType, injector);
}
exports.createNgModuleFactory = createNgModuleFactory;
class NgModuleFactory_ extends NgModuleFactory {
    constructor(type, _injector) {
        super();
        this.type = type;
        this._injector = _injector;
        this._moduleType = proxy_1.createProxyType(type);
    }
    get moduleType() {
        return this._moduleType;
    }
    create(parentInjector) {
        let instance = new this.moduleType();
        let staticProviders = getNgModuleStaticProvider(this.type);
        let injector = injector_1.Injector.create(staticProviders, parentInjector);
        return new NgModuleRef_(injector, instance);
    }
}
exports.NgModuleFactory_ = NgModuleFactory_;
function getNgModuleStaticProvider(type) {
    let meta = ims_decorator_1.getMetadata(type);
    let staticProviders = [];
    let staticProviderMap = new Map();
    meta.forEach(it => {
        if (ims_decorator_1.isClassMetadata(it)) {
            if (it.metadataKey === exports.NgModuleMetadataKey) {
                let { providers, imports } = it.metadataDef;
                imports &&
                    imports.map(imt => {
                        if (type_1.isType(imt)) {
                            getNgModuleStaticProvider(imt).forEach((it) => {
                                if (!ims_util_1.isArray(it)) {
                                    staticProviderMap.set(it.provide, it);
                                }
                            });
                        }
                        if (isModuleWithProviders(imt)) {
                            imt.providers.forEach(provide => {
                                let staticProvider = providerToStaticProvider(provide);
                                if (!ims_util_1.isArray(staticProvider)) {
                                    staticProviderMap.set(staticProvider.provide, staticProvider);
                                }
                            });
                        }
                    });
                providers &&
                    providers.forEach(provide => {
                        let staticProvider = providerToStaticProvider(provide);
                        if (!ims_util_1.isArray(staticProvider)) {
                            staticProviderMap.set(staticProvider.provide, staticProvider);
                        }
                    });
            }
        }
    });
    staticProviderMap.forEach(provide => {
        staticProviders.push(provide);
    });
    return staticProviders;
}
exports.getNgModuleStaticProvider = getNgModuleStaticProvider;
function providerToStaticProvider(provider) {
    if (provider_1.isTypeProvider(provider)) {
        return {
            provide: provider,
            useClass: proxy_1.createProxyType(provider),
            deps: [],
        };
    }
    if (provider_1.isClassProvider(provider)) {
        return {
            provide: provider.provide,
            useClass: proxy_1.createProxyType(provider.useClass),
            deps: [],
            multi: provider.multi,
        };
    }
    return provider;
}
exports.providerToStaticProvider = providerToStaticProvider;
class NgModuleRef_ extends NgModuleRef {
    constructor(_injector, _instance) {
        super();
        this._injector = _injector;
        this._instance = _instance;
    }
    get injector() {
        return this._injector;
    }
    get instance() {
        return this._instance;
    }
    destroy() { }
    onDestroy(callback) { }
}
exports.NgModuleRef_ = NgModuleRef_;
function compileNgModuleFactory(injector, moduleType) {
    return rxjs_1.of(createNgModuleFactory(moduleType, injector));
}
exports.compileNgModuleFactory = compileNgModuleFactory;
