"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("domain");
const rxjs_1 = require("rxjs");
exports.default = () => {
    return new rxjs_1.Observable((obs) => {
        const d = domain_1.create();
        d.on('error', err => {
            obs.error(err);
        });
        d.run(() => {
            obs.next();
            obs.complete();
        });
        process.on('uncaughtException', err => {
            obs.error(err);
        });
        process.on('unhandledRejection', err => {
            obs.error(err);
        });
        process.on('unhandledRejection', err => {
            obs.error(err);
        });
    });
};
