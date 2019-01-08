"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const root_1 = require("../../util/root");
const tryCatch_1 = require("../../util/tryCatch");
const errorObject_1 = require("../../util/errorObject");
const Observable_1 = require("../../Observable");
const Subscriber_1 = require("../../Subscriber");
const map_1 = require("../../operators/map");
function getCORSRequest() {
    if (root_1.root.XMLHttpRequest) {
        return new root_1.root.XMLHttpRequest();
    }
    else if (!!root_1.root.XDomainRequest) {
        return new root_1.root.XDomainRequest();
    }
    else {
        throw new Error('CORS is not supported by your browser');
    }
}
function getXMLHttpRequest() {
    if (root_1.root.XMLHttpRequest) {
        return new root_1.root.XMLHttpRequest();
    }
    else {
        let progId;
        try {
            const progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'];
            for (let i = 0; i < 3; i++) {
                try {
                    progId = progIds[i];
                    if (new root_1.root.ActiveXObject(progId)) {
                        break;
                    }
                }
                catch (e) {
                }
            }
            return new root_1.root.ActiveXObject(progId);
        }
        catch (e) {
            throw new Error('XMLHttpRequest is not supported by your browser');
        }
    }
}
function ajaxGet(url, headers = null) {
    return new AjaxObservable({ method: 'GET', url, headers });
}
exports.ajaxGet = ajaxGet;
function ajaxPost(url, body, headers) {
    return new AjaxObservable({ method: 'POST', url, body, headers });
}
exports.ajaxPost = ajaxPost;
function ajaxDelete(url, headers) {
    return new AjaxObservable({ method: 'DELETE', url, headers });
}
exports.ajaxDelete = ajaxDelete;
function ajaxPut(url, body, headers) {
    return new AjaxObservable({ method: 'PUT', url, body, headers });
}
exports.ajaxPut = ajaxPut;
function ajaxPatch(url, body, headers) {
    return new AjaxObservable({ method: 'PATCH', url, body, headers });
}
exports.ajaxPatch = ajaxPatch;
const mapResponse = map_1.map((x, index) => x.response);
function ajaxGetJSON(url, headers) {
    return mapResponse(new AjaxObservable({
        method: 'GET',
        url,
        responseType: 'json',
        headers
    }));
}
exports.ajaxGetJSON = ajaxGetJSON;
class AjaxObservable extends Observable_1.Observable {
    constructor(urlOrRequest) {
        super();
        const request = {
            async: true,
            createXHR: function () {
                return this.crossDomain ? getCORSRequest() : getXMLHttpRequest();
            },
            crossDomain: true,
            withCredentials: false,
            headers: {},
            method: 'GET',
            responseType: 'json',
            timeout: 0
        };
        if (typeof urlOrRequest === 'string') {
            request.url = urlOrRequest;
        }
        else {
            for (const prop in urlOrRequest) {
                if (urlOrRequest.hasOwnProperty(prop)) {
                    request[prop] = urlOrRequest[prop];
                }
            }
        }
        this.request = request;
    }
    _subscribe(subscriber) {
        return new AjaxSubscriber(subscriber, this.request);
    }
}
AjaxObservable.create = (() => {
    const create = (urlOrRequest) => {
        return new AjaxObservable(urlOrRequest);
    };
    create.get = ajaxGet;
    create.post = ajaxPost;
    create.delete = ajaxDelete;
    create.put = ajaxPut;
    create.patch = ajaxPatch;
    create.getJSON = ajaxGetJSON;
    return create;
})();
exports.AjaxObservable = AjaxObservable;
class AjaxSubscriber extends Subscriber_1.Subscriber {
    constructor(destination, request) {
        super(destination);
        this.request = request;
        this.done = false;
        const headers = request.headers = request.headers || {};
        if (!request.crossDomain && !headers['X-Requested-With']) {
            headers['X-Requested-With'] = 'XMLHttpRequest';
        }
        if (!('Content-Type' in headers) && !(root_1.root.FormData && request.body instanceof root_1.root.FormData) && typeof request.body !== 'undefined') {
            headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        }
        request.body = this.serializeBody(request.body, request.headers['Content-Type']);
        this.send();
    }
    next(e) {
        this.done = true;
        const { xhr, request, destination } = this;
        const response = new AjaxResponse(e, xhr, request);
        if (response.response === errorObject_1.errorObject) {
            destination.error(errorObject_1.errorObject.e);
        }
        else {
            destination.next(response);
        }
    }
    send() {
        const { request, request: { user, method, url, async, password, headers, body } } = this;
        const createXHR = request.createXHR;
        const xhr = tryCatch_1.tryCatch(createXHR).call(request);
        if (xhr === errorObject_1.errorObject) {
            this.error(errorObject_1.errorObject.e);
        }
        else {
            this.xhr = xhr;
            this.setupEvents(xhr, request);
            let result;
            if (user) {
                result = tryCatch_1.tryCatch(xhr.open).call(xhr, method, url, async, user, password);
            }
            else {
                result = tryCatch_1.tryCatch(xhr.open).call(xhr, method, url, async);
            }
            if (result === errorObject_1.errorObject) {
                this.error(errorObject_1.errorObject.e);
                return null;
            }
            if (async) {
                xhr.timeout = request.timeout;
                xhr.responseType = request.responseType;
            }
            if ('withCredentials' in xhr) {
                xhr.withCredentials = !!request.withCredentials;
            }
            this.setHeaders(xhr, headers);
            result = body ? tryCatch_1.tryCatch(xhr.send).call(xhr, body) : tryCatch_1.tryCatch(xhr.send).call(xhr);
            if (result === errorObject_1.errorObject) {
                this.error(errorObject_1.errorObject.e);
                return null;
            }
        }
        return xhr;
    }
    serializeBody(body, contentType) {
        if (!body || typeof body === 'string') {
            return body;
        }
        else if (root_1.root.FormData && body instanceof root_1.root.FormData) {
            return body;
        }
        if (contentType) {
            const splitIndex = contentType.indexOf(';');
            if (splitIndex !== -1) {
                contentType = contentType.substring(0, splitIndex);
            }
        }
        switch (contentType) {
            case 'application/x-www-form-urlencoded':
                return Object.keys(body).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(body[key])}`).join('&');
            case 'application/json':
                return JSON.stringify(body);
            default:
                return body;
        }
    }
    setHeaders(xhr, headers) {
        for (let key in headers) {
            if (headers.hasOwnProperty(key)) {
                xhr.setRequestHeader(key, headers[key]);
            }
        }
    }
    setupEvents(xhr, request) {
        const progressSubscriber = request.progressSubscriber;
        function xhrTimeout(e) {
            const { subscriber, progressSubscriber, request } = xhrTimeout;
            if (progressSubscriber) {
                progressSubscriber.error(e);
            }
            const ajaxTimeoutError = new exports.AjaxTimeoutError(this, request);
            if (ajaxTimeoutError.response === errorObject_1.errorObject) {
                subscriber.error(errorObject_1.errorObject.e);
            }
            else {
                subscriber.error(ajaxTimeoutError);
            }
        }
        xhr.ontimeout = xhrTimeout;
        xhrTimeout.request = request;
        xhrTimeout.subscriber = this;
        xhrTimeout.progressSubscriber = progressSubscriber;
        if (xhr.upload && 'withCredentials' in xhr) {
            if (progressSubscriber) {
                let xhrProgress;
                xhrProgress = function (e) {
                    const { progressSubscriber } = xhrProgress;
                    progressSubscriber.next(e);
                };
                if (root_1.root.XDomainRequest) {
                    xhr.onprogress = xhrProgress;
                }
                else {
                    xhr.upload.onprogress = xhrProgress;
                }
                xhrProgress.progressSubscriber = progressSubscriber;
            }
            let xhrError;
            xhrError = function (e) {
                const { progressSubscriber, subscriber, request } = xhrError;
                if (progressSubscriber) {
                    progressSubscriber.error(e);
                }
                const ajaxError = new exports.AjaxError('ajax error', this, request);
                if (ajaxError.response === errorObject_1.errorObject) {
                    subscriber.error(errorObject_1.errorObject.e);
                }
                else {
                    subscriber.error(ajaxError);
                }
            };
            xhr.onerror = xhrError;
            xhrError.request = request;
            xhrError.subscriber = this;
            xhrError.progressSubscriber = progressSubscriber;
        }
        function xhrReadyStateChange(e) {
            return;
        }
        xhr.onreadystatechange = xhrReadyStateChange;
        xhrReadyStateChange.subscriber = this;
        xhrReadyStateChange.progressSubscriber = progressSubscriber;
        xhrReadyStateChange.request = request;
        function xhrLoad(e) {
            const { subscriber, progressSubscriber, request } = xhrLoad;
            if (this.readyState === 4) {
                let status = this.status === 1223 ? 204 : this.status;
                let response = (this.responseType === 'text' ? (this.response || this.responseText) : this.response);
                if (status === 0) {
                    status = response ? 200 : 0;
                }
                if (status < 400) {
                    if (progressSubscriber) {
                        progressSubscriber.complete();
                    }
                    subscriber.next(e);
                    subscriber.complete();
                }
                else {
                    if (progressSubscriber) {
                        progressSubscriber.error(e);
                    }
                    const ajaxError = new exports.AjaxError('ajax error ' + status, this, request);
                    if (ajaxError.response === errorObject_1.errorObject) {
                        subscriber.error(errorObject_1.errorObject.e);
                    }
                    else {
                        subscriber.error(ajaxError);
                    }
                }
            }
        }
        xhr.onload = xhrLoad;
        xhrLoad.subscriber = this;
        xhrLoad.progressSubscriber = progressSubscriber;
        xhrLoad.request = request;
    }
    unsubscribe() {
        const { done, xhr } = this;
        if (!done && xhr && xhr.readyState !== 4 && typeof xhr.abort === 'function') {
            xhr.abort();
        }
        super.unsubscribe();
    }
}
exports.AjaxSubscriber = AjaxSubscriber;
class AjaxResponse {
    constructor(originalEvent, xhr, request) {
        this.originalEvent = originalEvent;
        this.xhr = xhr;
        this.request = request;
        this.status = xhr.status;
        this.responseType = xhr.responseType || request.responseType;
        this.response = parseXhrResponse(this.responseType, xhr);
    }
}
exports.AjaxResponse = AjaxResponse;
function AjaxErrorImpl(message, xhr, request) {
    Error.call(this);
    this.message = message;
    this.name = 'AjaxError';
    this.xhr = xhr;
    this.request = request;
    this.status = xhr.status;
    this.responseType = xhr.responseType || request.responseType;
    this.response = parseXhrResponse(this.responseType, xhr);
    return this;
}
AjaxErrorImpl.prototype = Object.create(Error.prototype);
exports.AjaxError = AjaxErrorImpl;
function parseJson(xhr) {
    if ('response' in xhr) {
        return xhr.responseType ? xhr.response : JSON.parse(xhr.response || xhr.responseText || 'null');
    }
    else {
        return JSON.parse(xhr.responseText || 'null');
    }
}
function parseXhrResponse(responseType, xhr) {
    switch (responseType) {
        case 'json':
            return tryCatch_1.tryCatch(parseJson)(xhr);
        case 'xml':
            return xhr.responseXML;
        case 'text':
        default:
            return ('response' in xhr) ? xhr.response : xhr.responseText;
    }
}
function AjaxTimeoutErrorImpl(xhr, request) {
    exports.AjaxError.call(this, 'ajax timeout', xhr, request);
    this.name = 'AjaxTimeoutError';
    return this;
}
exports.AjaxTimeoutError = AjaxTimeoutErrorImpl;
