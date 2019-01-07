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
  return gulp(join(ROOT, 'packages'), join(ROOT, 'node_modules'), false)(
    false,
  ).subscribe(res => {
    console.log('finish');
  });
};
