"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gulp = require("gulp");
const sass = require("gulp-sass");
const ims_rxjs_1 = require("ims-rxjs");
exports.scss = (src, dest) => {
    let run = () => {
        return new ims_rxjs_1.Observable(obs => {
            let stream = gulp
                .src(src)
                .pipe(sass({
                outputStyle: 'compressed',
                sourceMap: true,
            }).on('error', sass.logError))
                .pipe(gulp.dest(dest));
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
