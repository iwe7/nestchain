"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function withIs(Class, symbolName) {
    const symbol = Symbol.for(symbolName);
    let Target = class extends Class {
        get [symbol]() {
            return true;
        }
        get [Symbol.toStringTag]() {
            return Class.name;
        }
        static is(obj) {
            return !!(obj && obj[symbol]);
        }
    };
    return Target;
}
exports.withIs = withIs;
