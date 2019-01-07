import { gulp } from './_gulp';
import { join } from 'path';
import fs = require('fs');
import { ROOT } from 'ims-const';
import { from, Observable } from 'rxjs';
import _gulp = require('gulp');

import { concatMap, switchMap } from 'rxjs/operators';
import listDirTask from './list';
import { clean } from './clean';

export const gulpPackages = () => {
  return gulp(join(ROOT, 'packages'), join(ROOT, 'publish'))(false)
    .pipe(
      concatMap(() => {
        return from(
          listDirTask(join(ROOT, 'publish'))
            .map(file => ({
              name: file.name,
              path: join(file.path, 'src'),
            }))
            .filter(res => fs.existsSync(res.path)),
        ).pipe(
          switchMap(res => {
            return clean(res.path).run.pipe(
              concatMap(() => {
                return new Observable(obs => {
                  let stream = _gulp
                    .src([res.path + '/**/*', res.path + '/*'])
                    .pipe(_gulp.dest(join(ROOT, 'packages', res.name, 'lib')));
                  stream.on('end', () => {
                    obs.next();
                    obs.complete();
                  });
                });
              }),
            );
          }),
        );
      }),
      switchMap(() => clean(join(ROOT, 'publish')).run),
    )
    .subscribe(res => {
      console.log('finish');
    });
};
