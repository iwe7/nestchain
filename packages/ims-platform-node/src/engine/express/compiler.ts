import { Compiler, Injector, StaticProvider } from 'ims-core';
import { Multihashing } from 'ims-multihash';
import { RouterToken } from './engine';
import { isObservable } from 'ims-rxjs';
import { isPromise } from 'ims-util';
export function toString(json: any) {
  if (typeof json === 'string') {
    return json;
  } else if (typeof json === 'object') {
    return JSON.stringify(json);
  } else if (Reflect.has(json, 'toString')) {
    return json.toString();
  } else {
    return 'error';
  }
}

export class CompilerImpl extends Compiler {
  constructor(public injector: Injector) {
    super();
  }
  compile(type: any): StaticProvider[] {
    let str = type.toString();
    let hashing = this.injector.get<Multihashing>(Multihashing);
    let hash = hashing.hash(Buffer.from(str)).toString('hex');
    return [
      {
        provide: RouterToken,
        useValue: {
          path: hash,
          fn: (req, res, next, injector) => {
            let args = req.body;
            try {
              let instance = injector.get(type);
              let params = req.params;
              if (Reflect.has(instance, params.method)) {
                let json = instance[params.method](...args);
                if (isObservable(json)) {
                  json.subscribe(data => res.end(toString(data)));
                } else if (isPromise(json)) {
                  json.then(data => res.end(toString(data)));
                } else {
                  res.end(toString(json));
                }
              }
              res.end(`not found 404`);
            } catch (e) {
              debugger;
              res.end(`not found 500`);
            }
          },
        },
        multi: true,
      },
    ];
  }
}
