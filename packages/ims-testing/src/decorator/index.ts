import { makeDecorator, injector3 } from 'ims-decorator';
import 'reflect-metadata';
export const Test = makeDecorator('TestMetadataKey', 'visitTest', dir => dir);

@Test()
export class DemoTest {}

injector3()(DemoTest).subscribe(res => {
  console.log(res);
});
