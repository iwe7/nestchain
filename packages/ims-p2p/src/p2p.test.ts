import { P2pServer } from './server';
import { P2pClient } from './client';

import { injector } from 'ims-protocol';
injector(P2pServer);
injector(P2pClient);
