import gulp = require('gulp');

export const image = (src: string, dest: string) => {
  let run = () =>
    gulp.src(src).pipe(
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
