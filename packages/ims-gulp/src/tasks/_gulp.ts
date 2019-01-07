import { clean } from './clean';
import { scss } from './scss';
import { ts } from './ts';
import { copy } from './copy';

import { concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

export const gulp = (src: string, dest: string) => {
  return (watch: boolean) => {
    return clean(dest + '/**/*').run.pipe(
      concatMap(() => {
        if (watch) {
          scss([src + '/**/*.scss', src + '/*.scss'], dest).watch();
          ts([src + '/**/*.{ts,tsx}', src + '/*.{ts,tsx}'], dest).watch();
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
          scss([src + '/**/*.scss', src + '/*.scss'], dest).run();
          ts([src + '/**/*.{ts,tsx}', src + '/*.{ts,tsx}'], dest).run();
          copy(
            [
              src +
                '/**/*.{png,svg,gif,jpg,jpeg,json,html,xml,md,yml,log,js,wxml,wxss}',
              src +
                '/*.{png,svg,gif,jpg,jpeg,json,html,xml,md,yml,log,js,wxml,wxss}',
            ],
            dest,
          ).run();
        }
        return of(null);
      }),
    );
  };
};

export default gulp;
