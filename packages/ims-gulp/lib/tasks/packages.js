"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _gulp_1 = require("./_gulp");
const path_1 = require("path");
const ims_const_1 = require("ims-const");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
exports.gulpPackages = (name = '') => {
    let deps = packages[name] || [];
    if (deps.length > 0) {
        return rxjs_1.forkJoin(...deps.map(dep => exports.gulpPackages(dep))).pipe(operators_1.concatMap(() => _gulp_1.gulp(path_1.join(ims_const_1.ROOT, 'packages', name, 'src'), path_1.join(ims_const_1.ROOT, 'packages', name, 'lib'), false)));
    }
    else {
        return _gulp_1.gulp(path_1.join(ims_const_1.ROOT, 'packages', name, 'src'), path_1.join(ims_const_1.ROOT, 'packages', name, 'lib'), false);
    }
};
const packages = {
    'ims-bin': ['ims-const', 'ims-gulp', 'ims-webpack-util'],
    'ims-const': [],
    'ims-gulp': [],
};
