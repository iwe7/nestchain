import { platformWxapp, ImsPlatformWxappModule } from 'ims-platform-wxapp';
import { NgModule } from 'ims-core';
@NgModule({
  imports: [ImsPlatformWxappModule],
})
export class WxappTest {}
platformWxapp([])
  .bootstrapModule(WxappTest)
  .subscribe(res => {
    console.log(res);
    debugger;
  });
