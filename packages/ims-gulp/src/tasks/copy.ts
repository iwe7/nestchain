import gulp = require('gulp');
import { Observable, Observer } from 'ims-rxjs';
export const copy = (src: string | string[], dest: string) => {
  let run = () => {
    let observer: Observer<any>;
    console.log(`copy ${src} to ${dest}`);
    let stream: NodeJS.ReadWriteStream = gulp.src(src).pipe(gulp.dest(dest));
    stream.on('end', () => {
      console.log('copy success');
      observer && observer.next(void 0);
      observer && observer.complete();
    });
    return new Observable(obs => {
      observer = obs;
    });
  };
  let watch = () => gulp.watch(src, run);
  return {
    run,
    watch,
  };
};
