import gulp = require('gulp');
export const copy = (src: string, dest: string) => {
  let run = () => {
    console.log(`copy from ${src} to ${dest}`);
    gulp.src(src).pipe(gulp.dest(dest));
  };
  let watch = () => gulp.watch(src, run);
  return {
    run,
    watch,
  };
};
