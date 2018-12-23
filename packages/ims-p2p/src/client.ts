import { Client } from 'ims-grpc';
import { join } from 'path';

@Client({
  fileName: join(__dirname, 'p2p.proto'),
})
export class P2pClient {}
