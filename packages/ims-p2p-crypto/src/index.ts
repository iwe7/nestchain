import { NgModule } from 'ims-core';
import { Aes } from './aes/aes';
import { Hmac } from './hmac/hmac';
@NgModule({
  providers: [Aes, Hmac],
})
export class P2pCryptoModule {}
