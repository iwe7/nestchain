import { NgModule } from 'ims-core';
import { Aes } from './aes/aes';
import { Hmac } from './hmac/hmac';
import { Secp256k1Factory } from './secp256k1/secp256k1';
import { Keys } from './keys/keys';
import { Crypto } from './crypto';
import { Ciphers } from './aes/ciphers';

@NgModule({
  providers: [Aes, Hmac, Secp256k1Factory, Keys, Crypto, Ciphers],
})
export class P2pCryptoModule {}
