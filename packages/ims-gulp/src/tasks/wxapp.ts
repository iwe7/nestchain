import path = require('path');
import fs = require('fs');
import gulp = require('gulp');

import { ROOT } from 'ims-const';
import { Observable, of } from 'rxjs';

export async function gulpWeixin() {
  let name: string = 'ims-wxapp-demo';
  let deps: string[] = [
    'ims-core',
    'ims-rxjs',
    'reflect-metadata',
    'tslib',
    'ims-util',
    'ims-decorator',
    'ims-http',
    'ims-platform-wxapp',
  ];
  let packageJson = {
    name: name,
    version: '1.0',
    dependencies: deps.map(dep => `${dep}:"*"`),
  };
  deps.map(async dep => {
    await miniprogramNpm(name, dep).toPromise();
  });
  fs.writeFileSync(
    path.join(ROOT, 'packages', name, 'lib', 'package.json'),
    JSON.stringify(packageJson, null, 2),
  );
}

export function miniprogramNpm(base: string, name: string) {
  let rootPath = path.join(ROOT, 'packages', name);
  if (fs.existsSync(rootPath)) {
    return new Observable(obser => {
      let stream = gulp
        .src([
          `${ROOT}/packages/${name}/lib/**/*.js`,
          `${ROOT}/packages/${name}/lib/*.js`,
        ])
        .pipe(
          gulp.dest(`${ROOT}/packages/${base}/lib/miniprogram_npm/${name}`),
        );

      stream.on('end', () => {
        obser.next();
        obser.complete();
      });
    });
  } else {
    return of(null);
  }
}
