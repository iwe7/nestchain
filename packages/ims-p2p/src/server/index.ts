import { Server } from 'ims-protocol';
import { MessageRouter } from './message';
@Server({
  address: '/ip4/127.0.0.1/udp/3000',
  router: [MessageRouter],
})
export class P2pServer {}
