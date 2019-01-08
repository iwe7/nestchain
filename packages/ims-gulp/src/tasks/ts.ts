import gulp = require('gulp');
import typescript = require('gulp-typescript');
const ROOT = process.cwd();
import path = require('path');
import { Observable, Observer } from 'ims-rxjs';

export const ts = (
  src: string | string[],
  dest: string,
  dev: boolean = false,
) => {
  const run = () => {
    console.log(`tsc ${src}`);
    let observer: Observer<any>;
    let tsProject = typescript.createProject(
      path.join(ROOT, 'tsconfig.build.json'),
    );
    let stream: NodeJS.ReadWriteStream = gulp
      .src(src)
      .pipe(tsProject())
      .pipe(gulp.dest(dest));
    stream.on('end', () => {
      console.log(`tsc end`);
      observer.next(void 0);
      observer.complete();
    });
    return new Observable(obs => {
      observer = obs;
    });
  };

  const watch = () => gulp.watch(src, run);
  return {
    run,
    watch,
  };
};
