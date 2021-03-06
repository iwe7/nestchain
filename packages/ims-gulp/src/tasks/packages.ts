import { gulp } from './_gulp';
import { join } from 'path';
import { ROOT } from 'ims-const';
import { Observable } from 'ims-rxjs';

export const gulpPackages = (name: string = ''): Observable<any> => {
  return gulp(
    join(ROOT, 'packages', name, 'src'),
    join(ROOT, 'packages', name, 'lib'),
  );
};
export async function doPackages() {
  await gulpPackages('tslib').toPromise();
  await gulpPackages('reflect-metadata').toPromise();
  await gulpPackages('ims-const').toPromise();
  await gulpPackages('ims-rxjs').toPromise();
  await gulpPackages('ims-util').toPromise();
  await gulpPackages('ims-decorator').toPromise();
  await gulpPackages('ims-core').toPromise();
  await gulpPackages('ims-types').toPromise();
  await gulpPackages('ims-http').toPromise();
  await gulpPackages('ims-gulp').toPromise();
  await gulpPackages('ims-webpack-util').toPromise();
  await gulpPackages('ims-webpack-manifest').toPromise();
  await gulpPackages('ims-bin').toPromise();
  await gulpPackages('ims-platform-wxapp').toPromise();
  await gulpPackages('ims-wxapp-demo').toPromise();
}
