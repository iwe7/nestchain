"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gulp = require("gulp");
exports.copy = (src, dest) => {
    let run = () => {
        console.log(`copy from ${src} to ${dest}`);
        gulp.src(src).pipe(gulp.dest(dest));
    };
    let watch = () => gulp.watch(src, run);
    return {
        run,
        watch,
    };
};
