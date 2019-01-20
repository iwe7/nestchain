import { CoreModule, NgModule, corePlatform } from 'ims-core';
import IpfsHttpClient = require('ipfs-http-client');
@NgModule({
  imports: [],
})
export class H5Module {}
corePlatform()
  .then(res => res.bootstrapModule(CoreModule))
  .then(async res => {
    let ipfs = IpfsHttpClient({
      host: '127.0.0.1',
      port: 5001,
      protocol: 'http',
    });
    ipfs.object
      .get('QmZcvUvxNc8P9NebseeCfrDHn4xQwNTmrwWtuY8PDr9c3C')
      .then(res => {
        console.log(res);
      });
    console.log('platform h5 start success');
  });
