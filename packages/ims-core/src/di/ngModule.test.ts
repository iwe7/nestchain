import { NgModule } from './ngModule';
import { createImsFactory } from './ims';

export class TestInjectable {}

@NgModule({
  providers: [],
})
export class TestNgModule1 {}

@NgModule({
  providers: [
    {
      provide: TestInjectable,
      useValue: new TestInjectable(),
    },
  ],
  imports: [
    () =>
      new Promise((resolve, reject) => {
        resolve(TestNgModule1);
      }),
  ],
})
export class TestNgModule2 {}

async function bootstrap() {
  let ref = await createImsFactory(TestNgModule2).create();
  let test = await ref.injector.get(TestInjectable);
  debugger;
}
bootstrap();
