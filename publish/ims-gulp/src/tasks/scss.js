"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gulp = require("gulp");
const sass = require("gulp-sass");
exports.scss = (src, dest) => {
    let run = () => gulp
        .src(src)
        .pipe(sass({
        outputStyle: 'compressed',
        sourceMap: true,
    }).on('error', sass.logError))
        .pipe(gulp.dest(dest));
    let watch = () => gulp.watch(src, run);
    return {
        run,
        watch,
    };
};
