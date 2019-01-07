"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defs_1 = require("./defs");
class InjectionToken {
    constructor(_desc, options) {
        this._desc = _desc;
        this.ngMetadataName = 'InjectionToken';
        if (options !== undefined) {
            this.ngInjectableDef = defs_1.defineInjectable({
                providedIn: options.providedIn || 'root',
                factory: options.factory,
            });
        }
        else {
            this.ngInjectableDef = undefined;
        }
    }
    toString() {
        return `InjectionToken ${this._desc}`;
    }
}
exports.InjectionToken = InjectionToken;
