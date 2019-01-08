"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const injectable_1 = require("./di/injectable");
const metadata_1 = require("./di/metadata");
const injection_token_1 = require("./di/injection_token");
const ims_util_1 = require("ims-util");
exports.APP_INITIALIZER = new injection_token_1.InjectionToken('Application Initializer');
let ApplicationInitStatus = class ApplicationInitStatus {
    constructor(appInits) {
        this.appInits = appInits;
        this.initialized = false;
        this.done = false;
        this.donePromise = new Promise((res, rej) => {
            this.resolve = res;
            this.reject = rej;
        });
    }
    runInitializers() {
        if (this.initialized) {
            return;
        }
        const asyncInitPromises = [];
        const complete = () => {
            this.done = true;
            this.resolve();
        };
        if (this.appInits) {
            for (let i = 0; i < this.appInits.length; i++) {
                const initResult = this.appInits[i]();
                if (ims_util_1.isPromise(initResult)) {
                    asyncInitPromises.push(initResult);
                }
            }
        }
        Promise.all(asyncInitPromises)
            .then(() => {
            complete();
        })
            .catch(e => {
            this.reject(e);
        });
        if (asyncInitPromises.length === 0) {
            complete();
        }
        this.initialized = true;
    }
};
ApplicationInitStatus = tslib_1.__decorate([
    injectable_1.Injectable(),
    tslib_1.__param(0, metadata_1.Inject(exports.APP_INITIALIZER)), tslib_1.__param(0, metadata_1.Optional()),
    tslib_1.__metadata("design:paramtypes", [Array])
], ApplicationInitStatus);
exports.ApplicationInitStatus = ApplicationInitStatus;
