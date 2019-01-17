import { Injectable, Injector, InjectionToken } from 'ims-core';
import glob = require('glob');
export const GlobOptions = new InjectionToken<glob.IOptions>('GlobOptions');

@Injectable({
  providedIn: 'root',
})
export class ImsGlob {
  constructor(public injector: Injector) {}
  scan(pattern: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      let options = this.injector.get(GlobOptions, null);
      glob(pattern, options, (err, files) => {
        if (err) reject(err);
        resolve(files);
      });
    });
  }
}
