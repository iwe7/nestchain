import gulp = require('gulp');
import { Observable } from 'rxjs';
export const copy = (src: string | string[], dest: string) => {
  let run = () => {
    return new Observable(obs => {
      console.log(`copy ${src} to ${dest}`);
      let stream: NodeJS.ReadWriteStream = gulp.src(src).pipe(gulp.dest(dest));
      stream.on('end', () => {
        obs.next();
        obs.complete();
      });
    });
  };
  let watch = () => gulp.watch(src, run);
  return {
    run,
    watch,
  };
};
