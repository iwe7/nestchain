import { platform } from '.';
import { CoreModule, NgModule } from 'ims-core';
import { ImsIpfsModule } from 'ims-ipfs';
@NgModule({
  imports: [ImsIpfsModule],
})
export class H5Module {}
platform()
  .then(res => res.bootstrapModule(CoreModule))
  .then(res => {
    console.log('platform h5 start success');
  });
