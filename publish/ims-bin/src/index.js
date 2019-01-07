#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const ims_core_1 = require("ims-core");
const build_1 = require("./build");
const base_1 = require("./base");
const parser = require("yargs-parser");
const operators_1 = require("rxjs/operators");
const rxjs_1 = require("rxjs");
const ims_util_1 = require("ims-util");
const packages_1 = require("./packages");
let ImsBinModule = class ImsBinModule {
};
ImsBinModule = tslib_1.__decorate([
    ims_core_1.NgModule({
        providers: [
            {
                provide: base_1.ImsBinToken,
                useClass: build_1.BuildCommand,
                multi: true,
                deps: [],
            },
            {
                provide: base_1.ImsBinToken,
                useClass: packages_1.PackagesCommand,
                multi: true,
                deps: [],
            },
        ],
    })
], ImsBinModule);
exports.ImsBinModule = ImsBinModule;
const imsBinPlatform = ims_core_1.createPlatformFactory(ims_core_1.corePlatform, 'ims-bin', []);
imsBinPlatform([])
    .bootstrapModule(ImsBinModule)
    .pipe(operators_1.concatMap(res => {
    let commands = res.injector.get(base_1.ImsBinToken);
    let flags = parser(process.argv.slice(2));
    const { _, ...opts } = flags;
    if (_.length > 0 && commands) {
        let command = commands.find(command => command.match(_[0], opts));
        if (command) {
            let res = command.run();
            console.log(res);
            if (res) {
                if (ims_util_1.isPromise(res)) {
                    return rxjs_1.from(res);
                }
                if (rxjs_1.isObservable(res)) {
                    return res;
                }
                return rxjs_1.of(res);
            }
            else {
                return rxjs_1.of(void 0);
            }
        }
        else {
            console.log(`can not find command ${_[0]}`);
            return rxjs_1.of(void 0);
        }
    }
}))
    .subscribe();
