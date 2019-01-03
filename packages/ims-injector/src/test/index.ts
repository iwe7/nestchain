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
debugger;
