import { OnGet } from '../interface';
import { createProxy } from './createProxy';
import { Type } from '../type';

export class Demo implements OnGet {
  onGet(p: PropertyKey, receiver: any) {
    return Reflect.get(this, p, receiver);
  }
  title: string = 'title';
}
let proxyDemo = createProxy(Demo) as Type<Demo>;
const demo = new proxyDemo();
console.log(demo.title);
debugger;
