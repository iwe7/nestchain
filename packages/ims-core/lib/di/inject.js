"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const injector_1 = require("./injector");
const defs_1 = require("./defs");
const ims_util_1 = require("ims-util");
let _injectImplementation;
function inject(token, flags = injector_1.InjectFlags.Default) {
    return (_injectImplementation || injectInjectorOnly)(token, flags);
}
exports.inject = inject;
let _currentInjector = undefined;
function setCurrentInjector(injector) {
    _currentInjector = injector;
}
exports.setCurrentInjector = setCurrentInjector;
function injectInjectorOnly(token, flags = injector_1.InjectFlags.Default) {
    if (_currentInjector === undefined) {
        throw new Error(`inject() must be called from an injection context`);
    }
    else if (_currentInjector === null) {
        return injectRootLimpMode(token, undefined, flags);
    }
    else {
        return _currentInjector.get(token, flags & injector_1.InjectFlags.Optional ? null : undefined, flags);
    }
}
exports.injectInjectorOnly = injectInjectorOnly;
function injectRootLimpMode(token, notFoundValue, flags) {
    const injectableDef = defs_1.getInjectableDef(token);
    if (injectableDef && injectableDef.providedIn == 'root') {
        return injectableDef.value === undefined
            ? (injectableDef.value = injectableDef.factory())
            : injectableDef.value;
    }
    if (flags & injector_1.InjectFlags.Optional)
        return null;
    if (notFoundValue !== undefined)
        return notFoundValue;
    throw new Error(`Injector: NOT_FOUND [${ims_util_1.stringify(token)}]`);
}
exports.injectRootLimpMode = injectRootLimpMode;
