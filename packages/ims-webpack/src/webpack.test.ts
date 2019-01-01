import { Webpack } from './decorator';
import { injector } from './visitor';
import 'reflect-metadata';
@Webpack({})
export class TestWebpack {}

injector(TestWebpack).subscribe(res => {
  console.log(res);
  debugger;
});
