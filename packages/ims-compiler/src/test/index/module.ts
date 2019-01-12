import { NgModule } from 'ims-core';
import { IndexApi } from './type';
import { IndexApiImpl } from './index.api';

/**
 * 服务器端
 * get class method
 */

@NgModule({
  providers: [
    {
      provide: IndexApi,
      useClass: IndexApiImpl,
      deps: [],
    },
  ],
})
export class IndexModule {}
