"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const del = require("del");
const path = require("path");
const ims_rxjs_1 = require("ims-rxjs");
const operators_1 = require("ims-rxjs/operators");
const list_1 = require("./list");
const ims_const_1 = require("ims-const");
exports.clean = () => ims_rxjs_1.forkJoin(...list_1.listDirTask(path.join(ims_const_1.ROOT, 'packages')).map(file => {
    return createDelObservable(file.path + '/lib');
}));
function createDelObservable(src) {
    return ims_rxjs_1.from(del(src)).pipe(operators_1.tap(() => console.log(`clean ${src}`)));
}
