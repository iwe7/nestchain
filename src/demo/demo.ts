import { NgModule, bootstrapModule } from 'ims-core';
import { ImsLibp2pNodeModule } from 'ims-libp2p-browser';
import VConsole = require('vconsole');
@NgModule({
  imports: [ImsLibp2pNodeModule],
})
export class H5Module {}

bootstrapModule(H5Module).then(() => {
  const vConsole = new VConsole();
});
