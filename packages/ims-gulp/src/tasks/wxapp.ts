import path = require('path');
import { ROOT } from 'ims-const';
import { Observable, of } from 'rxjs';
import fs = require('fs-extra');
export async function gulpWeixin() {
  let name: string = 'ims-wxapp-demo';
  let deps: string[] = [
    'ims-core',
    'ims-rxjs',
    'reflect-metadata',
    'tslib',
    'ramda',
    'ims-util',
    'ims-decorator',
    'ims-http',
    'ims-platform-wxapp',
  ];
  // let packageJson = {
  //   name: name,
  //   version: '1.0',
  //   dependencies: deps.map(dep => `${dep}:"*"`),
  // };
  deps.map(async dep => {
    await miniprogramNpm(name, dep).toPromise();
  });
  // fs.writeFileSync(
  //   path.join(ROOT, 'packages', name, 'lib', 'package.json'),
  //   JSON.stringify(packageJson, null, 2),
  // );
}

export function miniprogramNpm(base: string, name: string) {
  let rootPath = path.join(ROOT, 'packages', name);
  if (fs.existsSync(rootPath)) {
    return new Observable(obser => {
      fs.copySync(
        `${ROOT}/packages/${name}/lib/`,
        `${ROOT}/packages/${base}/lib/miniprogram_npm/${name}`,
      );
      obser.next();
      obser.complete();
    });
  } else {
    return of(null);
  }
}
