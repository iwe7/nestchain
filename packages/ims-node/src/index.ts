import { nodePlatform } from 'ims-platform-node';
import { NgModule, NgModuleRef } from 'ims-core';
@NgModule({
  imports: [],
})
export class ImsNodeModule {}
try {
  nodePlatform()
    .then(res => {
      res.bootstrapModule(ImsNodeModule).then(res => {
        let ref = res.injector.get(NgModuleRef);
        console.log(res);
      });
    })
    .catch(e => {
      throw e;
    });
} catch (e) {
  debugger;
}
