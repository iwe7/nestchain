import { makeDecorator, injector } from 'ims-decorator';
import 'reflect-metadata';
export const Test = makeDecorator('TestMetadataKey', 'visitTest', dir => dir);

@Test()
export class DemoTest {
  title: string = 'demo';
}

injector()(DemoTest).subscribe(res => {
  console.log(res);
  debugger;
});
