import { NgModule } from 'ims-core';
import { ImsMerkleTreeFactory } from './ims-merkle';
import { MultihashModule, Multihashing } from 'ims-multihash';

@NgModule({
  providers: [
    {
      provide: ImsMerkleTreeFactory,
      useFactory: (hash: Multihashing) => new ImsMerkleTreeFactory(hash),
      deps: [Multihashing],
    },
  ],
  imports: [MultihashModule],
})
export class ImsMerkleModule {}

export * from './ims-merkle';
