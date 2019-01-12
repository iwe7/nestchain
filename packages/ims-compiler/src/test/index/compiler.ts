import CID = require('cids');
import multihash = require('multihashes');
import * as types from './type';
import multihashing = require('multihashing');
import {
  InjectionToken,
  Inject,
  inject,
  corePlatform,
  NgModule,
} from 'ims-core';
let buf = Buffer.from('beep boop');
console.log(multihashing(buf, 'sha1').toString().length);

let res = {};
Object.keys(types).map(key => {
  res[key] = multihashing(Buffer.from(types[key]), 'sha2-256').toString('hex');
});

const content = Buffer.from(JSON.stringify(res));
console.log(content.toString());
let encoded = multihash.encode(content, 'sha1');
let cid = new CID(encoded);
let str = cid.toV1().toBaseEncodedString();

function add(a: number, b: number) {
  return a + b;
}

let token = new InjectionToken(
  multihashing(Buffer.from(add.toString()), 'sha2-256').toString('hex'),
);

@NgModule({
  providers: [
    {
      provide: token,
      useFactory: () => add,
      deps: [],
    },
  ],
})
export class CoreModule {}

corePlatform()
  .bootstrapModule(CoreModule)
  .subscribe(res => {
    let token3 = inject(token);
    debugger;
  });
let token2 = Inject(token);

let a = 1,
  b = 2;
let reso = add(a, b);
