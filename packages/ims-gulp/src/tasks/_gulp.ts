import { scss } from './scss';
import { ts } from './ts';
import { copy } from './copy';
import { forkJoin } from 'ims-rxjs';

export const gulp = (src: string, dest: string) => {
  return forkJoin(
    scss([src + '/**/*.scss', src + '/*.scss'], dest).run(),
    ts([src + '/**/*.{ts,tsx}', src + '/*.{ts,tsx}'], dest).run(),
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
