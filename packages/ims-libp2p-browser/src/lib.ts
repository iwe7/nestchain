import { Provider } from 'ims-core';
import * as tokens from 'ims-libp2p';
export default [
  {
    provide: tokens.Libp2pWebsockets,
    useValue: require('libp2p-websockets'),
  },
  {
    provide: tokens.Libp2pWebrtcStar,
    useValue: require('libp2p-webrtc-star'),
  },
  {
    provide: tokens.Libp2pWebsocketStar,
    useValue: require('libp2p-websocket-star'),
  },
  {
    provide: tokens.Libp2pMplex,
    useValue: require('libp2p-mplex'),
  },
  {
    provide: tokens.Libp2pSecio,
    useValue: require('libp2p-secio'),
  },
  {
    provide: tokens.Libp2pSpdy,
    useValue: require('libp2p-spdy'),
  },
  {
    provide: tokens.Libp2pBootstrap,
    useValue: require('libp2p-bootstrap'),
  },
  {
    provide: tokens.Libp2p,
    useValue: require('libp2p'),
  },
] as Provider[];
