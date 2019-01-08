"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scss_1 = require("./scss");
const ts_1 = require("./ts");
const copy_1 = require("./copy");
const ims_rxjs_1 = require("ims-rxjs");
exports.gulp = (src, dest) => {
    return ims_rxjs_1.forkJoin(scss_1.scss([src + '/**/*.scss', src + '/*.scss'], dest).run(), ts_1.ts([src + '/**/*.{ts,tsx}', src + '/*.{ts,tsx}'], dest).run(), copy_1.copy([
        src +
            '/**/*.{png,svg,gif,jpg,jpeg,json,html,xml,md,yml,log,js,wxml,wxss,d.ts}',
        src +
            '/*.{png,svg,gif,jpg,jpeg,json,html,xml,md,yml,log,js,wxml,wxss,d.ts}',
    ], dest).run());
};
exports.default = exports.gulp;
