import gulp = require('gulp');
export const copy = (src: string | string[], dest: string) => {
  let run = () => gulp.src(src).pipe(gulp.dest(dest));
  let watch = () => gulp.watch(src, run);
  return {
    run,
    watch,
  };
};
