import gulp = require('gulp');
import gulpImage = require('gulp-image');

export const image = (src: string | string[], dest: string) => {
  let run = () =>
    gulp
      .src(src)
      .pipe(
        gulpImage({
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
        }),
      )
      .pipe(
        gulp.dest(dest, {
          cwd: dest,
        }),
      );
  let watch = () => gulp.watch(src, run);
  return {
    run,
    watch,
  };
};
