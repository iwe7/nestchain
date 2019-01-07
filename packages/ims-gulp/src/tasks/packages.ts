import { gulp } from './_gulp';
import { join } from 'path';
import { ROOT } from 'ims-const';
import { forkJoin, Observable, of } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
let cache: Map<string, boolean> = new Map();

export const gulpPackages = (name: string = ''): Observable<any> => {
  let deps: string[] = packages[name] || [];
  if (cache.has(name)) return of(null);
  // todo
  if (deps.length > 0) {
    return forkJoin(
      ...deps.map(dep =>
        gulpPackages(dep).pipe(tap(name => cache.set(name, true))),
      ),
    ).pipe(
      concatMap(() =>
        gulp(
          join(ROOT, 'packages', name, 'src'),
          join(ROOT, 'packages', name, 'lib'),
          false,
        ),
      ),
    );
  } else {
    return gulp(
      join(ROOT, 'packages', name, 'src'),
      join(ROOT, 'packages', name, 'lib'),
      false,
    );
  }
};

const packages = {
  'ims-bin': ['ims-const', 'ims-gulp', 'ims-webpack-util'],
  'ims-const': [],
  'ims-gulp': [],
  'ims-wxapp-demo': ['ims-core', 'ims-platform-wxapp', 'ims-util', 'ims-types'],
  'ims-core': ['ims-util', 'ims-decorator'],
  'ims-platform-wxapp': ['ims-core'],
  'ims-decorator': ['ims-util'],
  'ims-types': [],
};
