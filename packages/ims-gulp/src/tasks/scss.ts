import gulp = require('gulp');
import sass = require('gulp-sass');

export const scss = (src: string | string[], dest: string) => {
  let run = () =>
    gulp
      .src(src)
      .pipe(
        sass({
          outputStyle: 'compressed',
          sourceMap: true,
        }).on('error', sass.logError),
      )
      .pipe(gulp.dest(dest));
  let watch = () => gulp.watch(src, run);
  return {
    run,
    watch,
  };
};
