"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ImsError extends Error {
    constructor(msg, code, props) {
        super(msg);
        this.code = code;
        if (props) {
            for (let key in props) {
                this[key] = props[key];
            }
        }
    }
}
exports.ImsError = ImsError;
