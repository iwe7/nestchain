# `ims-injector`

> 依赖注入，在 angular 的基础上进行二次开发

## Usage

```ts
import { Injectable, inject, Optional } from 'ims-injector';

class Dependency {}

@Injectable({
  providedIn: 'root',
  deps: [Dependency],
})
export class NeedsDependency {
  constructor(public dependency: Dependency) {
    this.dependency = dependency;
  }
}
let ref = inject(NeedsDependency);
```

参考 @angular/core
