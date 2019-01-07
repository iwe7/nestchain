"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_core_1 = require("ims-core");
const ims_http_1 = require("ims-http");
const rxjs_1 = require("rxjs");
const ims_http_2 = require("ims-http");
const XSSI_PREFIX = /^\)\]\}',?\n/;
function getResponseUrl(xhr) {
    if ('responseURL' in xhr && xhr.responseURL) {
        return xhr.responseURL;
    }
    if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
        return xhr.getResponseHeader('X-Request-URL');
    }
    return null;
}
let HttpXhrBackend = class HttpXhrBackend {
    constructor() { }
    handle(req) {
        return new rxjs_1.Observable((observer) => {
            const xhr = new XMLHttpRequest();
            xhr.open(req.method, req.urlWithParams);
            if (!!req.withCredentials) {
                xhr.withCredentials = true;
            }
            req.headers.forEach((name, values) => xhr.setRequestHeader(name, values.join(',')));
            if (!req.headers.has('Accept')) {
                xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
            }
            if (!req.headers.has('Content-Type')) {
                const detectedType = req.detectContentTypeHeader();
                if (detectedType !== null) {
                    xhr.setRequestHeader('Content-Type', detectedType);
                }
            }
            if (req.responseType) {
                const responseType = req.responseType.toLowerCase();
                xhr.responseType = (responseType !== 'json'
                    ? responseType
                    : 'text');
            }
            const reqBody = req.serializeBody();
            let headerResponse = null;
            const partialFromXhr = () => {
                if (headerResponse !== null) {
                    return headerResponse;
                }
                const status = xhr.status === 1223 ? 204 : xhr.status;
                const statusText = xhr.statusText || 'OK';
                const headers = new ims_http_1.HttpHeaders(xhr.getAllResponseHeaders());
                const url = getResponseUrl(xhr) || req.url;
                headerResponse = new ims_http_2.HttpHeaderResponse({
                    headers,
                    status,
                    statusText,
                    url,
                });
                return headerResponse;
            };
            const onLoad = () => {
                let { headers, status, statusText, url } = partialFromXhr();
                let body = null;
                if (status !== 204) {
                    body =
                        typeof xhr.response === 'undefined'
                            ? xhr.responseText
                            : xhr.response;
                }
                if (status === 0) {
                    status = !!body ? 200 : 0;
                }
                let ok = status >= 200 && status < 300;
                if (typeof body === 'string') {
                    const originalBody = body;
                    body = body.replace(XSSI_PREFIX, '');
                    try {
                        body = body !== '' ? JSON.parse(body) : null;
                    }
                    catch (error) {
                        body = originalBody;
                    }
                }
                if (ok) {
                    observer.next(new ims_http_2.HttpResponse({
                        body,
                        headers,
                        status,
                        statusText,
                        url: url || undefined,
                    }));
                    observer.complete();
                }
                else {
                    observer.error(new ims_http_2.HttpErrorResponse({
                        error: body,
                        headers,
                        status,
                        statusText,
                        url: url || undefined,
                    }));
                }
            };
            const onError = (error) => {
                const { url } = partialFromXhr();
                const res = new ims_http_2.HttpErrorResponse({
                    error,
                    status: xhr.status || 0,
                    statusText: xhr.statusText || 'Unknown Error',
                    url: url || undefined,
                });
                observer.error(res);
            };
            let sentHeaders = false;
            const onDownProgress = (event) => {
                if (!sentHeaders) {
                    observer.next(partialFromXhr());
                    sentHeaders = true;
                }
                let progressEvent = {
                    type: ims_http_2.HttpEventType.DownloadProgress,
                    loaded: event.loaded,
                };
                if (event.lengthComputable) {
                    progressEvent.total = event.total;
                }
                if (req.responseType === 'text' && !!xhr.responseText) {
                    progressEvent.partialText = xhr.responseText;
                }
                observer.next(progressEvent);
            };
            const onUpProgress = (event) => {
                let progress = {
                    type: ims_http_2.HttpEventType.UploadProgress,
                    loaded: event.loaded,
                };
                if (event.lengthComputable) {
                    progress.total = event.total;
                }
                observer.next(progress);
            };
            xhr.addEventListener('load', onLoad);
            xhr.addEventListener('error', onError);
            if (req.reportProgress) {
                xhr.addEventListener('progress', onDownProgress);
                if (reqBody !== null && xhr.upload) {
                    xhr.upload.addEventListener('progress', onUpProgress);
                }
            }
            xhr.send(reqBody);
            observer.next({ type: ims_http_2.HttpEventType.Sent });
            return () => {
                xhr.removeEventListener('error', onError);
                xhr.removeEventListener('load', onLoad);
                if (req.reportProgress) {
                    xhr.removeEventListener('progress', onDownProgress);
                    if (reqBody !== null && xhr.upload) {
                        xhr.upload.removeEventListener('progress', onUpProgress);
                    }
                }
                xhr.abort();
            };
        });
    }
};
HttpXhrBackend = tslib_1.__decorate([
    ims_core_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], HttpXhrBackend);
exports.HttpXhrBackend = HttpXhrBackend;
