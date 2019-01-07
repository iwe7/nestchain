"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function extend(target, ...sources) {
    return sources.reduce((acc, target) => {
        if (!acc)
            return target;
        return mixin(acc, target);
    }, target);
}
exports.extend = extend;
function mixin(Target, Super) {
    let target = (function (_target, _super) {
        const symbol = Symbol.for(`@${_target.name}/@${_super.name}`);
        class Mixin extends Super {
            get [symbol]() {
                return true;
            }
            constructor(...args) {
                super(...args);
                _target.call(this, ...args);
            }
        }
        let _static = _target;
        while (Reflect.has(_static, 'name') && _static.name !== '') {
            let names = Object.getOwnPropertyNames(_static).filter(key => !['name', 'length', 'prototype'].includes(key));
            for (let i of names) {
                Mixin[i] = _static[i];
            }
            _static = Reflect.getPrototypeOf(_static);
        }
        for (let i in _target.prototype) {
            Reflect.defineProperty(Mixin.prototype, i, _target.prototype[i]);
        }
        Reflect.defineProperty(Mixin, 'name', {
            get() {
                return _target.name;
            },
        });
        return Mixin;
    })(Target, Super);
    return target;
}
exports.mixin = mixin;
