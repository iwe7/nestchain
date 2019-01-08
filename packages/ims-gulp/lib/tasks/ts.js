"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gulp = require("gulp");
const typescript = require("gulp-typescript");
const ROOT = process.cwd();
const path = require("path");
const ims_rxjs_1 = require("ims-rxjs");
exports.ts = (src, dest, dev = false) => {
    const run = () => {
        console.log(`tsc ${src}`);
        let observer;
        let tsProject = typescript.createProject(path.join(ROOT, 'tsconfig.build.json'));
        let stream = gulp
            .src(src)
            .pipe(tsProject())
            .pipe(gulp.dest(dest));
        stream.on('end', () => {
            console.log(`tsc end`);
            observer.next(void 0);
            observer.complete();
        });
        return new ims_rxjs_1.Observable(obs => {
            observer = obs;
        });
    };
    const watch = () => gulp.watch(src, run);
    return {
        run,
        watch,
    };
};
