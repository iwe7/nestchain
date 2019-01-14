import { NgModule } from 'ims-core';
import { Secp256k1Factory } from './secp256k1/secp256k1';
import { ImsP2pCrypto } from './crypto';
@NgModule({
  providers: [Secp256k1Factory, ImsP2pCrypto],
})
export class P2pCryptoModule {}

export { ImsP2pCrypto } from './crypto';
export { Secp256k1Factory } from './secp256k1/secp256k1';
