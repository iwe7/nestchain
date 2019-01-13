import { NgModule } from 'ims-core';
import { ImsDemo } from './types';
import { ImsDemoImplClient } from './inc';

@NgModule({
  providers: [
    {
      provide: ImsDemo,
      useClass: ImsDemoImplClient,
      deps: [],
    },
  ],
  controllers: [ImsDemo],
})
class ImsDemosModule {}
export default ImsDemosModule;
