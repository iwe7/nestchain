"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tasks_1 = require("./tasks");
const operators_1 = require("rxjs/operators");
const rxjs_1 = require("rxjs");
exports.gulp = (src, dest) => {
    return (watch) => {
        return tasks_1.clean(dest + '/**/*').run.pipe(operators_1.switchMap(() => {
            if (watch) {
                tasks_1.scss(src + '/**/*.scss', dest).watch();
                tasks_1.ts(src + '/**/*.{ts,tsx}', dest).watch();
                tasks_1.copy(src +
                    '/**/*.{png,svg,gif,jpg,jpeg,json,html,xml,md,yml,log,js,wxml,wxss}', dest).watch();
            }
            else {
                tasks_1.scss(src + '/**/*.scss', dest).run();
                tasks_1.ts(src + '/**/*.{ts,tsx}', dest).run();
                tasks_1.copy(src +
                    '/**/*.{png,svg,gif,jpg,jpeg,json,html,xml,md,yml,log,js,wxml,wxss}', dest).run();
            }
            return rxjs_1.of(null);
        }));
    };
};
exports.default = exports.gulp;
