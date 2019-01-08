"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gulp = require("gulp");
const ims_rxjs_1 = require("ims-rxjs");
exports.copy = (src, dest) => {
    let run = () => {
        let observer;
        console.log(`copy ${src} to ${dest}`);
        let stream = gulp.src(src).pipe(gulp.dest(dest));
        stream.on('end', () => {
            console.log('copy success');
            observer.next(void 0);
            observer.complete();
        });
        return new ims_rxjs_1.Observable(obs => {
            observer = obs;
        });
    };
    let watch = () => gulp.watch(src, run);
    return {
        run,
        watch,
    };
};
