"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gulp = require("gulp");
const rxjs_1 = require("rxjs");
exports.copy = (src, dest) => {
    let run = () => {
        console.log(`copy from ${src} to ${dest}`);
        gulp.src(src).pipe(gulp.dest(dest));
        console.log('copy');
        return rxjs_1.of(null);
    };
    let watch = () => gulp.watch(src, run);
    return {
        run,
        watch,
    };
};
