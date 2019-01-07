import gulp = require('gulp');
import typescript = require('gulp-typescript');
import { ROOT } from 'ims-const';
import path = require('path');
import { Observable } from 'rxjs';
export const ts = (
  src: string | string[],
  dest: string,
  dev: boolean = false,
) => {
  let tsProject = typescript.createProject(
    path.join(ROOT, dev ? 'tsconfig.json' : 'tsconfig.build.json'),
  );
  const run = () => {
    return new Observable(obs => {
      let stream: NodeJS.ReadWriteStream = gulp
        .src(src)
        .pipe(tsProject())
        .pipe(gulp.dest(dest));
      stream.on('end', () => {
        obs.next();
        obs.complete();
      });
    });
  };

  const watch = () => gulp.watch(src, run);
  return {
    run,
    watch,
  };
};
