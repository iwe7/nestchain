import { clean } from './clean';
import { scss } from './scss';
import { ts } from './ts';
import { copy } from './copy';

import { concatMap } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';

export const gulp = (src: string, dest: string, dev: boolean = false) => {
  return (watch: boolean) => {
    return clean(dest + '/**/*').run.pipe(
      concatMap(() => {
        if (watch) {
          scss([src + '/**/*.scss', src + '/*.scss'], dest).watch();
          ts([src + '/**/*.{ts,tsx}', src + '/*.{ts,tsx}'], dest, dev).watch();
          copy(
            [
              src +
                '/**/*.{png,svg,gif,jpg,jpeg,json,html,xml,md,yml,log,js,wxml,wxss}',
              src +
                '/*.{png,svg,gif,jpg,jpeg,json,html,xml,md,yml,log,js,wxml,wxss}',
            ],
            dest,
          ).watch();
        } else {
          return forkJoin(
            scss([src + '/**/*.scss', src + '/*.scss'], dest).run(),
            ts([src + '/**/*.{ts,tsx}', src + '/*.{ts,tsx}'], dest, dev).run(),
            copy(
              [
                src +
                  '/**/*.{png,svg,gif,jpg,jpeg,json,html,xml,md,yml,log,js,wxml,wxss}',
                src +
                  '/*.{png,svg,gif,jpg,jpeg,json,html,xml,md,yml,log,js,wxml,wxss}',
              ],
              dest,
            ).run(),
          );
        }
        return of(null);
      }),
    );
  };
};

export default gulp;
