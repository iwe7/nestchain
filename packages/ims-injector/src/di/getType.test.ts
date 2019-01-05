import { Injectable } from './injectable';
import { getType } from './getType';
import { Inject } from './metadata';
@Injectable()
export class DemoInjectable {
  title: string = 'demo';
}

@Injectable()
export class TestInjectable {
  addIndex(@Inject() demo: DemoInjectable) {
    console.log(demo instanceof DemoInjectable);
    console.log(demo.title);
    debugger;
  }
}

let res = getType(TestInjectable);
let ins = new res();
ins.addIndex();
