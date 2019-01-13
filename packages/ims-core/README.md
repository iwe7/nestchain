# `ims-core`

> 核心依赖注入

##

```ts

let record: Map<string,any> = new Map();
```

## 依赖

- [ims-util](../ims-util)
- [ims-decorator](../ims-decorator)
- [rxjs](https://github.com/ReactiveX/rxjs)

## Usage

```ts
import {
  createPlatformFactory,
  NgModule,
  ApplicationRef,
  Injectable,
  corePlatform,
} from 'ims-core';
let platformFactory = createPlatformFactory(corePlatform, 'core', []);
@Injectable({
  providedIn: 'root',
})
export class TestInjectable {}
@NgModule({
  providers: [],
  imports: [],
})
export class Test {
  ngDoBootstrap(appRef: ApplicationRef) {
    console.log(appRef);
  }
}
platformFactory([])
  .bootstrapModule(Test)
  .subscribe(res => {
    let inject = res.injector.get(TestInjectable);
    console.log(res);
    debugger;
  });
```
