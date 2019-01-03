import {
  Injectable,
  Injector,
  inject,
  setCurrentInjector,
  Optional,
} from 'ims-injector';

class Dependency {}

@Injectable({
  providedIn: 'root',
})
export class NeedsDependency {
  constructor(@Optional() public dependency: Dependency) {
    this.dependency = dependency;
  }
}
// 父级
const injector = Injector.of([Dependency]);
// 子级
const injectorChild = Injector.of([NeedsDependency], injector);
setCurrentInjector(injectorChild);
let ref = inject(NeedsDependency);
