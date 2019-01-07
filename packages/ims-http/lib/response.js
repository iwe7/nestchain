"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const headers_1 = require("./headers");
var HttpEventType;
(function (HttpEventType) {
    HttpEventType[HttpEventType["Sent"] = 0] = "Sent";
    HttpEventType[HttpEventType["UploadProgress"] = 1] = "UploadProgress";
    HttpEventType[HttpEventType["ResponseHeader"] = 2] = "ResponseHeader";
    HttpEventType[HttpEventType["DownloadProgress"] = 3] = "DownloadProgress";
    HttpEventType[HttpEventType["Response"] = 4] = "Response";
    HttpEventType[HttpEventType["User"] = 5] = "User";
})(HttpEventType = exports.HttpEventType || (exports.HttpEventType = {}));
class HttpResponseBase {
    constructor(init, defaultStatus = 200, defaultStatusText = 'OK') {
        this.headers = init.headers || new headers_1.HttpHeaders();
        this.status = init.status !== undefined ? init.status : defaultStatus;
        this.statusText = init.statusText || defaultStatusText;
        this.url = init.url || null;
        this.ok = this.status >= 200 && this.status < 300;
    }
}
exports.HttpResponseBase = HttpResponseBase;
class HttpHeaderResponse extends HttpResponseBase {
    constructor(init = {}) {
        super(init);
        this.type = HttpEventType.ResponseHeader;
    }
    clone(update = {}) {
        return new HttpHeaderResponse({
            headers: update.headers || this.headers,
            status: update.status !== undefined ? update.status : this.status,
            statusText: update.statusText || this.statusText,
            url: update.url || this.url || undefined,
        });
    }
}
exports.HttpHeaderResponse = HttpHeaderResponse;
class HttpResponse extends HttpResponseBase {
    constructor(init = {}) {
        super(init);
        this.type = HttpEventType.Response;
        this.body = init.body !== undefined ? init.body : null;
    }
    clone(update = {}) {
        return new HttpResponse({
            body: update.body !== undefined ? update.body : this.body,
            headers: update.headers || this.headers,
            status: update.status !== undefined ? update.status : this.status,
            statusText: update.statusText || this.statusText,
            url: update.url || this.url || undefined,
        });
    }
}
exports.HttpResponse = HttpResponse;
class HttpErrorResponse extends HttpResponseBase {
    constructor(init) {
        super(init, 0, 'Unknown Error');
        this.name = 'HttpErrorResponse';
        this.ok = false;
        if (this.status >= 200 && this.status < 300) {
            this.message = `Http failure during parsing for ${init.url ||
                '(unknown url)'}`;
        }
        else {
            this.message = `Http failure response for ${init.url ||
                '(unknown url)'}: ${init.status} ${init.statusText}`;
        }
        this.error = init.error || null;
    }
}
exports.HttpErrorResponse = HttpErrorResponse;
