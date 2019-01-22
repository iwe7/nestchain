import { bootstrapModule } from 'ims-core';
import { ImsCidModule } from './index';
import * as tokens from './tokens/index';
import fs = require('fs');
async function bootstrap() {
  let ref = await bootstrapModule(ImsCidModule);
  let base = await ref.injector.get(tokens.Multihashes);
  let str = ``;
  Object.keys(base.names).forEach(key => {
    let val = base.names[key];
    str += `${val}|`;
  });
  fs.writeFileSync(__dirname + '/1.ts', str);
  debugger;
}
bootstrap();
