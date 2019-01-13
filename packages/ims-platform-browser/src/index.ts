import {
  corePlatform,
  createPlatformFactory,
  Injector,
  getNgModuleStaticProvider,
  Compiler,
  StaticProvider,
  Http,
  HttpConfig,
} from 'ims-core';
import Axios, { AxiosResponse } from 'axios';
import { MultihashModule, Multihashing } from 'ims-multihash';
import { from } from 'ims-rxjs';
import { map } from 'ims-rxjs/operators';
import { LoggerModule } from 'packages/ims-logger/src';
export class CompilerImpl extends Compiler {
  constructor(public injector: Injector) {
    super();
  }
  compile(type: any): StaticProvider[] {
    let str = type.toString();
    let hashing = this.injector.get<Multihashing>(Multihashing);
    let hash = hashing.hash(Buffer.from(str)).toString('hex');
    return [createProxyHttp(type, hash)];
  }
}

export function createProxyHttp(type: any, path: string) {
  return {
    provide: type,
    useFactory: (injector: Injector) =>
      new Proxy(
        {},
        {
          get(target: any, p: PropertyKey, receiver: any): any {
            let http = injector.get<Http>(Http);
            return new Proxy(function() {}, {
              apply(target: any, thisArg: any, argArray?: any[]): any {
                return http.post(`${path}/${p as string}`, argArray);
              },
            });
          },
        },
      ),
    deps: [Injector],
  };
}
export const browserPlatform = createPlatformFactory(
  corePlatform,
  'browser platform',
  [
    {
      provide: Compiler,
      useFactory: (injector: Injector) => new CompilerImpl(injector),
      deps: [Injector],
    },
    {
      provide: HttpConfig,
      useValue: {
        baseURL: 'http://127.0.0.1:3000',
        timeout: 5000,
      },
    },
    {
      provide: Http,
      useFactory: (injector: Injector) => {
        let config = injector.get(HttpConfig);
        let axios = Axios.create(config);
        return {
          get(path: string) {
            return from(axios.get<any>(path)).pipe(
              map((res: AxiosResponse<any>) => res.data),
            );
          },
          post(path: string, data: any) {
            return from(axios.post(path, data)).pipe(
              map((res: AxiosResponse<any>) => res.data),
            );
          },
        };
      },
      deps: [Injector],
    },
    ...getNgModuleStaticProvider(MultihashModule),
    ...getNgModuleStaticProvider(LoggerModule),
  ],
);
