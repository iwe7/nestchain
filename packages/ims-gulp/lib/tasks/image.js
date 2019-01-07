"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gulp = require("gulp");
const gulpImage = require("gulp-image");
exports.image = (src, dest) => {
    let run = () => gulp
        .src(src)
        .pipe(gulpImage({
        pngquant: true,
        optipng: false,
        zopflipng: true,
        jpegRecompress: false,
        mozjpeg: true,
        guetzli: false,
        gifsicle: true,
        svgo: true,
        concurrent: 10,
        quiet: true,
    }))
        .pipe(gulp.dest(dest, {
        cwd: dest,
    }));
    let watch = () => gulp.watch(src, run);
    return {
        run,
        watch,
    };
};
