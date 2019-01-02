import { Visitor, injector } from '../injector3';
import { MetadataDef, isClassMetadata } from '../metadata';
import { ModuleOptions } from './module';
import { ImsContext } from '../context';
import { Type } from 'ims-core';
export class ImsDecoratorVisitor extends Visitor {
  visitModule(
    it: MetadataDef<ModuleOptions>,
    type: Type<any>,
    context: ImsContext,
  ) {
    let options = it.metadataDef;
    if (isClassMetadata(it)) {
      Object.keys(options.deps).map(de => {
        let item = options.deps[de];
        this.create(item, new ImsContext());
      });
    }
  }
}
export default injector(new ImsDecoratorVisitor());
