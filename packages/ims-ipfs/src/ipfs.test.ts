import { imsIpfsProviders } from './index';
import {
  createPlatformFactory,
  corePlatform,
  NgModule,
  IpfsFactory,
} from 'ims-core';

@NgModule()
export class ImsIpfsModule {}
createPlatformFactory(corePlatform, 'ims-ipfs', [...imsIpfsProviders])()
  .bootstrapModule(ImsIpfsModule)
  .subscribe(res => {
    let injector = res.injector;
    let factory = injector.get<IpfsFactory>(IpfsFactory);
    let ipfs = factory.create();
    debugger;
  });
