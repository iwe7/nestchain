"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const injection_token_1 = require("./di/injection_token");
const injector_1 = require("./di/injector");
const ims_rxjs_1 = require("ims-rxjs");
const operators_1 = require("ims-rxjs/operators");
const application_init_1 = require("./application_init");
const application_ref_1 = require("./application_ref");
const ngModule_1 = require("./di/ngModule");
class PlatformRef {
    constructor(_injector) {
        this._injector = _injector;
        this._modules = [];
    }
    get injector() {
        return this._injector;
    }
    bootstrapModule(moduleType) {
        return ngModule_1.compileNgModuleFactory(this.injector, moduleType).pipe(operators_1.concatMap(factory => {
            return this.bootstrapModuleFactory(factory);
        }));
    }
    bootstrapModuleFactory(moduleFactory) {
        let moduleRef = moduleFactory.create(this.injector);
        moduleRef.onDestroy(() => remove(this._modules, moduleRef));
        const initStatus = moduleRef.injector.get(application_init_1.ApplicationInitStatus);
        initStatus.runInitializers();
        let { ngDoBootstrap } = moduleRef.instance;
        if (ngDoBootstrap) {
            const appRef = moduleRef.injector.get(application_ref_1.ApplicationRef);
            ngDoBootstrap(appRef);
        }
        this._modules.push(moduleRef);
        return ims_rxjs_1.from(initStatus.donePromise).pipe(operators_1.map(() => moduleRef));
    }
}
exports.PlatformRef = PlatformRef;
function remove(list, el) {
    const index = list.indexOf(el);
    if (index > -1) {
        list.splice(index, 1);
    }
}
let _platform;
exports.ALLOW_MULTIPLE_PLATFORMS = new injection_token_1.InjectionToken('AllowMultipleToken');
exports.PLATFORM_INITIALIZER = new injection_token_1.InjectionToken('Platform Initializer');
exports.PLATFORM_ID = new injection_token_1.InjectionToken('Platform Id');
function createPlatform(injector) {
    if (_platform &&
        !_platform.destroyed &&
        !_platform.injector.get(exports.ALLOW_MULTIPLE_PLATFORMS, false)) {
        throw new Error('There can be only one platform. Destroy the previous one to create a new one.');
    }
    _platform = injector.get(PlatformRef);
    const inits = injector.get(exports.PLATFORM_INITIALIZER, null);
    if (inits)
        inits.forEach((init) => init());
    return _platform;
}
exports.createPlatform = createPlatform;
function getPlatform() {
    return _platform && !_platform.destroyed ? _platform : null;
}
exports.getPlatform = getPlatform;
function createPlatformFactory(parentPlatformFactory, name, providers = [], types) {
    const desc = `Platform: ${name}`;
    const marker = new injection_token_1.InjectionToken(desc);
    return (extraProviders = []) => {
        let platform = getPlatform();
        if (types) {
            types.forEach(type => {
                let pros = ngModule_1.getNgModuleStaticProvider(type);
                providers.concat(pros);
            });
        }
        if (!platform || platform.injector.get(exports.ALLOW_MULTIPLE_PLATFORMS, false)) {
            if (parentPlatformFactory) {
                parentPlatformFactory(providers
                    .concat(extraProviders)
                    .concat({ provide: marker, useValue: true }));
            }
            else {
                const injectedProviders = providers
                    .concat(extraProviders)
                    .concat({ provide: marker, useValue: true });
                createPlatform(injector_1.Injector.create({ providers: injectedProviders, name: desc }));
            }
        }
        return assertPlatform(marker);
    };
}
exports.createPlatformFactory = createPlatformFactory;
function assertPlatform(requiredToken) {
    const platform = getPlatform();
    if (!platform) {
        throw new Error('No platform exists!');
    }
    if (!platform.injector.get(requiredToken, null)) {
        throw new Error('A platform with a different configuration has been created. Please destroy it first.');
    }
    return platform;
}
exports.assertPlatform = assertPlatform;
