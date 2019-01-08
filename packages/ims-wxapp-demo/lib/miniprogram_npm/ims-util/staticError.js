"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringify_1 = require("./stringify");
function staticError(text, obj) {
    return new Error(formatError(text, obj));
}
exports.staticError = staticError;
const NEW_LINE = /\n/gm;
const NO_NEW_LINE = 'ɵ';
function formatError(text, obj, source = null) {
    text =
        text && text.charAt(0) === '\n' && text.charAt(1) == NO_NEW_LINE
            ? text.substr(2)
            : text;
    let context = stringify_1.stringify(obj);
    if (obj instanceof Array) {
        context = obj.map(stringify_1.stringify).join(' -> ');
    }
    else if (typeof obj === 'object') {
        let parts = [];
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                let value = obj[key];
                parts.push(key +
                    ':' +
                    (typeof value === 'string'
                        ? JSON.stringify(value)
                        : stringify_1.stringify(value)));
            }
        }
        context = `{${parts.join(', ')}}`;
    }
    return `StaticInjectorError${source ? '(' + source + ')' : ''}[${context}]: ${text.replace(NEW_LINE, '\n  ')}`;
}
exports.formatError = formatError;
