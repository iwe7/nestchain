import del = require('del');
import path = require('path');
import { from, forkJoin } from 'ims-rxjs';
import { tap } from 'ims-rxjs/operators';
import { listDirTask } from './list';
import { ROOT } from 'ims-const';

export const clean = forkJoin(
  ...listDirTask(path.join(ROOT, 'packages')).map(file => {
    return createDelObservable(file.path + '/lib');
  }),
);

function createDelObservable(src: string) {
  return from(del(src)).pipe(tap(() => console.log(`clean ${src}`)));
}
