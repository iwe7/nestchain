import gulp = require('gulp');
import sass = require('gulp-sass');
import { Observable } from 'rxjs';

export const scss = (src: string | string[], dest: string) => {
  let run = () => {
    return new Observable(obs => {
      let stream: NodeJS.ReadWriteStream = gulp
        .src(src)
        .pipe(
          sass({
            outputStyle: 'compressed',
            sourceMap: true,
          }).on('error', sass.logError),
        )
        .pipe(gulp.dest(dest));
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
