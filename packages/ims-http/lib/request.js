"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const headers_1 = require("./headers");
const params_1 = require("./params");
function mightHaveBody(method) {
    switch (method) {
        case 'DELETE':
        case 'GET':
        case 'HEAD':
        case 'OPTIONS':
        case 'JSONP':
            return false;
        default:
            return true;
    }
}
function isArrayBuffer(value) {
    return typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer;
}
function isBlob(value) {
    return typeof Blob !== 'undefined' && value instanceof Blob;
}
function isFormData(value) {
    return typeof FormData !== 'undefined' && value instanceof FormData;
}
class HttpRequest {
    constructor(method, url, third, fourth) {
        this.url = url;
        this.baseUrl = '';
        this.body = null;
        this.reportProgress = false;
        this.withCredentials = false;
        this.responseType = 'text';
        this.method = method.toUpperCase();
        this.baseUrl = HttpRequest.baseUrl;
        let options;
        if (mightHaveBody(this.method) || !!fourth) {
            this.body = third !== undefined ? third : null;
            options = fourth;
        }
        else {
            options = third;
        }
        if (options) {
            this.reportProgress = !!options.reportProgress;
            this.withCredentials = !!options.withCredentials;
            if (!!options.responseType) {
                this.responseType = options.responseType;
            }
            if (!!options.headers) {
                this.headers = options.headers;
            }
            if (!!options.params) {
                this.params = options.params;
            }
        }
        if (!this.headers) {
            this.headers = new headers_1.HttpHeaders();
        }
        if (!this.params) {
            this.params = new params_1.HttpParams();
            this.urlWithParams = `${HttpRequest.baseUrl ? HttpRequest.baseUrl : ''} + ${url}`;
        }
        else {
            const params = this.params.toString();
            if (params.length === 0) {
                this.urlWithParams = url;
            }
            else {
                const qIdx = url.indexOf('?');
                const sep = qIdx === -1 ? '?' : qIdx < url.length - 1 ? '&' : '';
                this.urlWithParams = url + sep + params;
            }
        }
    }
    serializeBody() {
        if (this.body === null) {
            return null;
        }
        if (isArrayBuffer(this.body) ||
            isBlob(this.body) ||
            isFormData(this.body) ||
            typeof this.body === 'string') {
            return this.body;
        }
        if (this.body instanceof params_1.HttpParams) {
            return this.body.toString();
        }
        if (typeof this.body === 'object' ||
            typeof this.body === 'boolean' ||
            Array.isArray(this.body)) {
            return JSON.stringify(this.body);
        }
        return this.body.toString();
    }
    detectContentTypeHeader() {
        if (this.body === null) {
            return null;
        }
        if (isFormData(this.body)) {
            return null;
        }
        if (isBlob(this.body)) {
            return this.body.type || null;
        }
        if (isArrayBuffer(this.body)) {
            return null;
        }
        if (typeof this.body === 'string') {
            return 'text/plain';
        }
        if (this.body instanceof params_1.HttpParams) {
            return 'application/x-www-form-urlencoded;charset=UTF-8';
        }
        if (typeof this.body === 'object' ||
            typeof this.body === 'number' ||
            Array.isArray(this.body)) {
            return 'application/json';
        }
        return null;
    }
    clone(update = {}) {
        const method = update.method || this.method;
        const url = update.url || this.url;
        const responseType = update.responseType || this.responseType;
        const body = update.body !== undefined ? update.body : this.body;
        const withCredentials = update.withCredentials !== undefined
            ? update.withCredentials
            : this.withCredentials;
        const reportProgress = update.reportProgress !== undefined
            ? update.reportProgress
            : this.reportProgress;
        let headers = update.headers || this.headers;
        let params = update.params || this.params;
        if (update.setHeaders !== undefined) {
            headers = Object.keys(update.setHeaders).reduce((headers, name) => headers.set(name, update.setHeaders[name]), headers);
        }
        if (update.setParams) {
            params = Object.keys(update.setParams).reduce((params, param) => params.set(param, update.setParams[param]), params);
        }
        return new HttpRequest(method, url, body, {
            params,
            headers,
            reportProgress,
            responseType,
            withCredentials,
        });
    }
}
HttpRequest.baseUrl = '';
exports.HttpRequest = HttpRequest;
