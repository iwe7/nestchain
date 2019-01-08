import gulp = require('gulp');
import uglify = require('gulp-uglify');
import babel = require('gulp-babel');
import concat = require('gulp-concat');
import { Observable, forkJoin, of } from 'ims-rxjs';
import path = require('path');
import fs = require('fs');

import { ROOT } from 'ims-const';
import { listDirTask } from './list';

export function _uglify() {
  console.log(`run task uglify!!!!`);
  let obss = [];
  listDirTask(path.join(ROOT, 'packages')).forEach(name => {
    obss.push(createUglify(name.name));
  });
  return forkJoin(...obss);
}

function createUglify(name: string) {
  let filePath = path.join(ROOT, 'packages', name, 'lib');
  if (fs.existsSync(filePath)) {
    return new Observable(obs => {
      let srcs = [
        `${ROOT}/packages/${name}/lib/**/*.js`,
        `${ROOT}/packages/${name}/lib/*.js`,
      ];
      let stream = gulp
        .src(srcs)
        .pipe(uglify())
        .pipe(concat(`${name}.min.js`))
        .pipe(gulp.dest(`${ROOT}/packages/${name}/dist`));
      stream.on('end', () => {
        console.log(name + 'end');
        obs.next();
        obs.complete();
      });
    });
  } else {
    console.log(`${name} lib not exist`);
    return of(null);
  }
}
