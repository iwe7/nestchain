"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpUrlEncodingCodec {
    encodeKey(key) {
        return standardEncoding(key);
    }
    encodeValue(value) {
        return standardEncoding(value);
    }
    decodeKey(key) {
        return decodeURIComponent(key);
    }
    decodeValue(value) {
        return decodeURIComponent(value);
    }
}
exports.HttpUrlEncodingCodec = HttpUrlEncodingCodec;
function paramParser(rawParams, codec) {
    const map = new Map();
    if (rawParams.length > 0) {
        const params = rawParams.split('&');
        params.forEach((param) => {
            const eqIdx = param.indexOf('=');
            const [key, val] = eqIdx == -1
                ? [codec.decodeKey(param), '']
                : [
                    codec.decodeKey(param.slice(0, eqIdx)),
                    codec.decodeValue(param.slice(eqIdx + 1)),
                ];
            const list = map.get(key) || [];
            list.push(val);
            map.set(key, list);
        });
    }
    return map;
}
function standardEncoding(v) {
    return encodeURIComponent(v)
        .replace(/%40/gi, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/gi, '$')
        .replace(/%2C/gi, ',')
        .replace(/%3B/gi, ';')
        .replace(/%2B/gi, '+')
        .replace(/%3D/gi, '=')
        .replace(/%3F/gi, '?')
        .replace(/%2F/gi, '/');
}
class HttpParams {
    constructor(options = {}) {
        this.updates = null;
        this.cloneFrom = null;
        this.encoder = options.encoder || new HttpUrlEncodingCodec();
        if (!!options.fromString) {
            if (!!options.fromObject) {
                throw new Error(`Cannot specify both fromString and fromObject.`);
            }
            this.map = paramParser(options.fromString, this.encoder);
        }
        else if (!!options.fromObject) {
            this.map = new Map();
            Object.keys(options.fromObject).forEach(key => {
                const value = options.fromObject[key];
                this.map.set(key, Array.isArray(value) ? value : [value]);
            });
        }
        else {
            this.map = null;
        }
    }
    has(param) {
        this.init();
        return this.map.has(param);
    }
    get(param) {
        this.init();
        const res = this.map.get(param);
        return !!res ? res[0] : null;
    }
    getAll(param) {
        this.init();
        return this.map.get(param) || null;
    }
    keys() {
        this.init();
        return Array.from(this.map.keys());
    }
    append(param, value) {
        return this.clone({ param, value, op: 'a' });
    }
    set(param, value) {
        return this.clone({ param, value, op: 's' });
    }
    delete(param, value) {
        return this.clone({ param, value, op: 'd' });
    }
    toString() {
        this.init();
        return this.keys()
            .map(key => {
            const eKey = this.encoder.encodeKey(key);
            return this.map.get(key)
                .map(value => eKey + '=' + this.encoder.encodeValue(value))
                .join('&');
        })
            .join('&');
    }
    clone(update) {
        const clone = new HttpParams({
            encoder: this.encoder,
        });
        clone.cloneFrom = this.cloneFrom || this;
        clone.updates = (this.updates || []).concat([update]);
        return clone;
    }
    init() {
        if (this.map === null) {
            this.map = new Map();
        }
        if (this.cloneFrom !== null) {
            this.cloneFrom.init();
            this.cloneFrom
                .keys()
                .forEach(key => this.map.set(key, this.cloneFrom.map.get(key)));
            this.updates.forEach(update => {
                switch (update.op) {
                    case 'a':
                    case 's':
                        const base = (update.op === 'a' ? this.map.get(update.param) : undefined) ||
                            [];
                        base.push(update.value);
                        this.map.set(update.param, base);
                        break;
                    case 'd':
                        if (update.value !== undefined) {
                            let base = this.map.get(update.param) || [];
                            const idx = base.indexOf(update.value);
                            if (idx !== -1) {
                                base.splice(idx, 1);
                            }
                            if (base.length > 0) {
                                this.map.set(update.param, base);
                            }
                            else {
                                this.map.delete(update.param);
                            }
                        }
                        else {
                            this.map.delete(update.param);
                            break;
                        }
                }
            });
            this.cloneFrom = null;
        }
    }
}
exports.HttpParams = HttpParams;
