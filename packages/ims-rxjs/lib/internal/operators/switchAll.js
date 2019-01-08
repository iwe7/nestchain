"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const switchMap_1 = require("./switchMap");
const identity_1 = require("../util/identity");
function switchAll() {
    return switchMap_1.switchMap(identity_1.identity);
}
exports.switchAll = switchAll;
