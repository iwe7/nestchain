import 'reflect-metadata';
import { platformWxapp } from 'ims-platform-wxapp';
import { NgModule } from 'ims-core';

@NgModule()
export class WxappModule {}

platformWxapp()
  .bootstrapModule(WxappModule)
  .subscribe(res => {
    console.log(res);
  });
