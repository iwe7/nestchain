"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const lang_1 = require("./lang");
function createMerge(isSame) {
    return function merge(...sources) {
        if (sources.length === 1) {
            return sources[0];
        }
        return sources.reduce((acc, curr) => mergeHelper(acc, curr, isSame), {});
    };
}
exports.createMerge = createMerge;
exports.default = createMerge((a, b) => ramda_1.equals(a, b));
function mergeHelper(a, b, isSame) {
    if (a === b) {
        return b;
    }
    const typeA = lang_1.getType(a);
    switch (typeA) {
        case 'array':
            return mergeArray(a, b, isSame);
        case 'object':
            return mergeObject(a, b, isSame);
        case 'undefined':
            return b;
        case 'null':
            return b;
        default:
            if (a === b) {
                return b;
            }
            return mergeDefault(a, b, isSame);
    }
}
function mergeArray(a, b, isSame) {
    const bType = lang_1.getType(b);
    switch (bType) {
        case 'array':
            const rowLength = a.length;
            const colLength = b.length;
            for (let i = 0; i < rowLength; i++) {
                for (let j = 0; j < colLength; j++) {
                    const equalKeys = getEqualKey(a[i], b[j], isSame);
                    const itema = a[i];
                    const itemb = b[j];
                    if (lang_1.isString(itema) && lang_1.isString(itemb)) {
                        if (itema === itemb) {
                        }
                        else if (itema.startsWith(itemb)) {
                            a[i] = itema;
                            delete b[j];
                            break;
                        }
                        else if (itemb.startsWith(itema)) {
                            a[i] = itemb;
                            delete b[j];
                            break;
                        }
                    }
                    if (equalKeys.length > 0) {
                        const result = mergeHelper(itema, itemb, isSame);
                        a[i] = result;
                        delete b[j];
                        break;
                    }
                }
            }
            a = a.filter(res => check(res));
            b = b.filter(res => check(res));
            return ramda_1.uniq(a.concat(b));
        case 'null':
        case 'undefined':
            return a;
        default:
            return [...a, b];
    }
}
function mergeObject(a, b, isSame) {
    const bType = lang_1.getType(b);
    switch (bType) {
        case 'array':
            return ramda_1.uniq([a, ...b]);
        case 'object':
            let result = {};
            const allKeys = ramda_1.uniq(ramda_1.keys(a).concat(ramda_1.keys(b)));
            if (allKeys.length > 0) {
                for (let i = 0; i < allKeys.length; i++) {
                    const key = allKeys[i];
                    const _keys = key + 's';
                    if (a[key] && b[_keys]) {
                        a[_keys] = [a[key]];
                        a = ramda_1.dissoc(key, a);
                    }
                    if (b[key] && a[_keys]) {
                        a = ramda_1.dissoc(_keys, a);
                        result = ramda_1.dissoc(_keys, a);
                    }
                    const source = a[key];
                    const target = b[key];
                    if (!lang_1.isNullOrUndefined(source) || !lang_1.isNullOrUndefined(target)) {
                        const res = mergeHelper(source, target, isSame);
                        result[key] = res;
                    }
                }
            }
            return result;
        default:
            return b;
    }
}
function check(a) {
    if (lang_1.isNullOrUndefined(a))
        return false;
    if (lang_1.isObject(a) || lang_1.isArray(a)) {
        return ramda_1.keys(a).length > 0;
    }
    return true;
}
function getEqualKey(a, b, isSame) {
    try {
        const key = ramda_1.uniq(ramda_1.keys(a).concat(ramda_1.keys(b)));
        return key.filter(key => {
            try {
                const res = isSame([key, toString(a[key])], [key, toString(b[key])]);
                return res;
            }
            catch (e) {
                return false;
            }
        });
    }
    catch (e) {
        return [];
    }
}
function toString(a) {
    const t = lang_1.getType(a);
    switch (t) {
        case 'null':
        case 'undefined':
            return false;
        case 'string':
            return a;
        case 'number':
            return `${a}`;
        case 'boolean':
            return `${a}`;
        case 'object':
            return `[object ${ramda_1.keys(a)
                .map(key => `${key}:${toString(a[key])}`)
                .join('\n')}]`;
        default:
            return a.toString();
    }
}
function mergeDefault(a, b, isSame) {
    const bType = lang_1.getType(b);
    switch (bType) {
        case 'array':
            return ramda_1.uniq([a, ...b]);
        case 'null':
        case 'undefined':
            return a;
        case 'string':
            if (b.startsWith(a)) {
                return b;
            }
            if (a.startsWith(b)) {
                return a;
            }
            return b;
        default:
            return b;
    }
}
