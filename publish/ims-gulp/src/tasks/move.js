"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gulp = require("gulp");
exports.image = (src, dest) => {
    let run = () => gulp.src(src).pipe(gulp.dest(dest, {
        cwd: dest,
    }));
    let watch = () => gulp.watch(src, run);
    return {
        run,
        watch,
    };
};
