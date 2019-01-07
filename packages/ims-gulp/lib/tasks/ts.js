"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gulp = require("gulp");
const typescript = require("gulp-typescript");
const ims_const_1 = require("ims-const");
const path = require("path");
const rxjs_1 = require("rxjs");
exports.ts = (src, dest) => {
    let tsProject = typescript.createProject(path.join(ims_const_1.ROOT, 'tsconfig.json'));
    const run = () => {
        return new rxjs_1.Observable(obs => {
            let stream = gulp
                .src(src)
                .pipe(tsProject())
                .pipe(gulp.dest(dest));
            stream.on('end', () => {
                obs.next();
                obs.complete();
            });
        });
    };
    const watch = () => gulp.watch(src, run);
    return {
        run,
        watch,
    };
};
