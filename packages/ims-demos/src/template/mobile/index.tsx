import { NgModule, APP_INITIALIZER, Injector, Logger } from 'ims-core';
import { ImsDemo } from '../../types';
import { browserPlatform } from 'ims-platform-browser';

@NgModule({
  controllers: [ImsDemo],
})
export class ViewModule {}

browserPlatform([
  {
    provide: APP_INITIALIZER,
    useValue: (injector: Injector) => {
      let logger = injector.get<Logger>(Logger);
      logger.subscribe(res => {
        console.log(res);
      });
    },
    multi: true,
  },
]).then(res => {
  res.bootstrapModule(ViewModule).then(res => {
    let demo = res.injector.get<ImsDemo>(ImsDemo);
    let logger = res.injector.get<Logger>(Logger);
    demo.getIndex('ming').subscribe(res => {
      logger.info(res);
    });
  });
});
