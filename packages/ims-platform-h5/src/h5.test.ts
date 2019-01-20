import { platform } from '.';
import { CoreModule, NgModule } from 'ims-core';
import { ImsIpfs } from 'ims-ipfs';
@NgModule({
  imports: [],
})
export class H5Module {}
platform()
  .then(res => res.bootstrapModule(CoreModule))
  .then(async res => {
    let ipfs: any = await res.injector.get(ImsIpfs);
    ipfs.files
      .cat('QmZcvUvxNc8P9NebseeCfrDHn4xQwNTmrwWtuY8PDr9c3C')
      .then(res => {
        console.log(res.toString());
      });
    console.log('platform h5 start success');
  });
