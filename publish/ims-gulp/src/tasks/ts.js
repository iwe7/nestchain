"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gulp = require("gulp");
const typescript = require("gulp-typescript");
const ims_const_1 = require("ims-const");
const path = require("path");
exports.ts = (src, dest) => {
    let tsProject = typescript.createProject(path.join(ims_const_1.ROOT, 'tsconfig.json'));
    const run = () => gulp
        .src(src)
        .pipe(tsProject())
        .pipe(gulp.dest(dest));
    const watch = () => gulp.watch(src, run);
    return {
        run,
        watch,
    };
};
