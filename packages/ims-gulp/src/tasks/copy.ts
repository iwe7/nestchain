import gulp = require('gulp');
import { of } from 'rxjs';
export const copy = (src: string | string[], dest: string) => {
  let run = () => {
    console.log(`copy from ${src} to ${dest}`);
    gulp.src(src).pipe(gulp.dest(dest));
    console.log('copy');
    return of(null);
  };
  let watch = () => gulp.watch(src, run);
  return {
    run,
    watch,
  };
};
