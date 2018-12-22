import { Controller } from 'ims-nest';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class ImsPeerController {
  constructor() {}

  @GrpcMethod('GetPeer')
  getPeer() {
    return 'get';
  }

  @GrpcMethod('GetPeerList')
  getPeers() {
    return 'list';
  }
}
