"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gulp = require("gulp");
const typescript = require("gulp-typescript");
const ROOT = process.cwd();
const path = require("path");
const rxjs_1 = require("rxjs");
exports.ts = (src, dest, dev = false) => {
    let tsProject = typescript.createProject(path.join(ROOT, dev ? 'tsconfig.json' : 'tsconfig.build.json'));
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
