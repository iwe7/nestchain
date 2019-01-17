import { NgModule, SourceRoot } from 'ims-core';
import { ImsMerkleModule } from 'ims-merkle';
import { ROOT } from 'ims-chain';
@NgModule({
  imports: [ImsMerkleModule],
  providers: [
    {
      provide: SourceRoot,
      useValue: ROOT,
    },
  ],
})
export class ImsFsCidModule {}
