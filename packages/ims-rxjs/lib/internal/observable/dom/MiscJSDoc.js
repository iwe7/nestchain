"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AjaxRequestDoc {
    constructor() {
        this.url = '';
        this.body = 0;
        this.user = '';
        this.async = false;
        this.method = '';
        this.headers = null;
        this.timeout = 0;
        this.password = '';
        this.hasContent = false;
        this.crossDomain = false;
        this.withCredentials = false;
        this.progressSubscriber = null;
        this.responseType = '';
    }
    createXHR() {
        return null;
    }
    resultSelector(response) {
        return null;
    }
}
exports.AjaxRequestDoc = AjaxRequestDoc;
