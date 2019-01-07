"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _gulp_1 = require("./_gulp");
const path_1 = require("path");
const ims_const_1 = require("ims-const");
exports.gulpPackages = () => {
    return _gulp_1.gulp(path_1.join(ims_const_1.ROOT, 'packages'), path_1.join(ims_const_1.ROOT, 'publish'))(false).subscribe(res => {
        console.log('finish');
    });
};
