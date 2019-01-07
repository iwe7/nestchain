"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gulp = require("gulp");
const rxjs_1 = require("rxjs");
exports.copy = (src, dest) => {
    let run = () => {
        return new rxjs_1.Observable(obs => {
            let stream = gulp.src(src).pipe(gulp.dest(dest));
            stream.on('end', () => {
                obs.next();
                obs.complete();
            });
        });
    };
    let watch = () => gulp.watch(src, run);
    return {
        run,
        watch,
    };
};
