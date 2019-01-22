import { NgModule } from 'ims-core';
import * as tokens from './tokens/index';

@NgModule({
  providers: [
    {
      provide: tokens.Multibase,
      useFactory: () => require('multibase'),
      deps: [],
    },
    {
      provide: tokens.Multihashes,
      useFactory: () => require('multihashes'),
      deps: [],
    },
    {
      provide: tokens.Cids,
      useFactory: () => require('cids'),
      deps: [],
    },
    {
      provide: tokens.CidTool,
      useFactory: () => require('cid-tool'),
      deps: [],
    },
  ],
})
export class ImsCidModule {}
