"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fields_1 = require("../render3/fields");
function defineInjectable(opts) {
    return {
        providedIn: opts.providedIn || null,
        factory: opts.factory,
        value: undefined,
    };
}
exports.defineInjectable = defineInjectable;
function defineInjector(options) {
    return {
        factory: options.factory,
        providers: options.providers || [],
        imports: options.imports || [],
    };
}
exports.defineInjector = defineInjector;
function getInjectableDef(type) {
    return type && type.hasOwnProperty(fields_1.NG_INJECTABLE_DEF)
        ? type[fields_1.NG_INJECTABLE_DEF]
        : null;
}
exports.getInjectableDef = getInjectableDef;
function getInjectorDef(type) {
    return type && type.hasOwnProperty(fields_1.NG_INJECTOR_DEF)
        ? type[fields_1.NG_INJECTOR_DEF]
        : null;
}
exports.getInjectorDef = getInjectorDef;
