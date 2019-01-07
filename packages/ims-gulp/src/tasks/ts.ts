import gulp = require('gulp');
import typescript = require('gulp-typescript');
import { ROOT } from 'ims-const';
import path = require('path');
export const ts = (src: string | string[], dest: string) => {
  let tsProject = typescript.createProject(path.join(ROOT, 'tsconfig.json'));
  console.log(ROOT);
  const run = () =>
    gulp
      .src(src)
      .pipe(tsProject())
      .pipe(gulp.dest(dest));

  const watch = () => gulp.watch(src, run);
  return {
    run,
    watch,
  };
};
