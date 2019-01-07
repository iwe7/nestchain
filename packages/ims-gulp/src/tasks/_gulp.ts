import { clean } from './clean';
import { scss } from './scss';
import { ts } from './ts';
import { copy } from './copy';

import { concatMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

export const gulp = (src: string, dest: string, dev: boolean = false) => {
  return forkJoin(
    scss([src + '/**/*.scss', src + '/*.scss'], dest).run(),
    ts([src + '/**/*.{ts,tsx}', src + '/*.{ts,tsx}'], dest, dev).run(),
    copy(
      [
        src +
          '/**/*.{png,svg,gif,jpg,jpeg,json,html,xml,md,yml,log,js,wxml,wxss,d.ts}',
        src +
          '/*.{png,svg,gif,jpg,jpeg,json,html,xml,md,yml,log,js,wxml,wxss,d.ts}',
      ],
      dest,
    ).run(),
  );
};

export default gulp;
