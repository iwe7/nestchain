"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clean_1 = require("./clean");
const scss_1 = require("./scss");
const ts_1 = require("./ts");
const copy_1 = require("./copy");
const operators_1 = require("rxjs/operators");
const rxjs_1 = require("rxjs");
exports.gulp = (src, dest, dev = false) => {
    return clean_1.clean(dest + '/**/*').run.pipe(operators_1.concatMap(() => {
        return rxjs_1.forkJoin(scss_1.scss([src + '/**/*.scss', src + '/*.scss'], dest).run(), ts_1.ts([src + '/**/*.{ts,tsx}', src + '/*.{ts,tsx}'], dest, dev).run(), copy_1.copy([
            src +
                '/**/*.{png,svg,gif,jpg,jpeg,json,html,xml,md,yml,log,js,wxml,wxss}',
            src +
                '/*.{png,svg,gif,jpg,jpeg,json,html,xml,md,yml,log,js,wxml,wxss}',
        ], dest).run());
    }));
};
exports.default = exports.gulp;
