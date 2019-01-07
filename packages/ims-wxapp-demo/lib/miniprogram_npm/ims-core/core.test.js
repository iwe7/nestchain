"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const createPlatform_1 = require("./createPlatform");
const ngModule_1 = require("./di/ngModule");
const injectable_1 = require("./di/injectable");
const core_1 = require("./platform/core");
let platformFactory = createPlatform_1.createPlatformFactory(core_1.corePlatform, 'core', []);
let TestInjectable = class TestInjectable {
};
TestInjectable = tslib_1.__decorate([
    injectable_1.Injectable({
        providedIn: 'root',
    })
], TestInjectable);
exports.TestInjectable = TestInjectable;
let Test = class Test {
    ngDoBootstrap(appRef) {
        console.log(appRef);
    }
};
Test = tslib_1.__decorate([
    ngModule_1.NgModule({
        providers: [],
        imports: [],
    })
], Test);
exports.Test = Test;
platformFactory([])
    .bootstrapModule(Test)
    .subscribe(res => {
    let inject = res.injector.get(TestInjectable);
    console.log(res);
    debugger;
});
