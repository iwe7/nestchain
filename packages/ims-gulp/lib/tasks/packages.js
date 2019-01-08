"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _gulp_1 = require("./_gulp");
const path_1 = require("path");
const ims_const_1 = require("ims-const");
let cache = new Map();
exports.gulpPackages = (name = '') => {
    return _gulp_1.gulp(path_1.join(ims_const_1.ROOT, 'packages', name, 'src'), path_1.join(ims_const_1.ROOT, 'packages', name, 'lib'));
};
async function doPackages() {
    await exports.gulpPackages('tslib').toPromise();
    await exports.gulpPackages('reflect-metadata').toPromise();
    await exports.gulpPackages('ims-const').toPromise();
    await exports.gulpPackages('ims-rxjs').toPromise();
    await exports.gulpPackages('ims-util').toPromise();
    await exports.gulpPackages('ims-decorator').toPromise();
    await exports.gulpPackages('ims-core').toPromise();
    await exports.gulpPackages('ims-types').toPromise();
    await exports.gulpPackages('ims-http').toPromise();
    await exports.gulpPackages('ims-gulp').toPromise();
    await exports.gulpPackages('ims-webpack-util').toPromise();
    await exports.gulpPackages('ims-webpack-manifest').toPromise();
    await exports.gulpPackages('ims-bin').toPromise();
    await exports.gulpPackages('ims-platform-wxapp').toPromise();
    await exports.gulpPackages('ims-wxapp-demo').toPromise();
}
exports.doPackages = doPackages;
