import { Provider } from 'ims-core';
import * as tokens from '../../tokens/index';
import { ImsPromise } from 'ims-util';
export default [
  {
    provide: tokens.Start,
    useValue: (options: tokens.InitOptions): Promise<any> => {
      let imsPromise = new ImsPromise();
      imsPromise.next();
      return imsPromise.promise;
    },
  },
] as Provider[];
