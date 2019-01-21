import * as tokens from 'ims-ipfs';
import { Provider } from 'ims-core';
import ipfs from './ipfs/index';

export default [
  {
    provide: tokens.Wrtc,
    useValue: require('wrtc'),
  },
  {
    provide: tokens.ElectronWebrtc,
    useValue: require('electron-webrtc')(),
  },
  {
    provide: tokens.Multiaddr,
    useValue: require('multiaddr'),
  },
  {
    provide: tokens.Hapi,
    useValue: require('hapi'),
  },
  {
    provide: tokens.HapiSetHeader,
    useValue: require('hapi-set-header'),
  },
  {
    provide: tokens.Libp2pBootstrap,
    useValue: require('libp2p-bootstrap'),
  },
  {
    provide: tokens.Libp2pMdns,
    useValue: require('libp2p-mdns'),
  },
  {
    provide: tokens.Libp2pTcp,
    useValue: require('libp2p-tcp'),
  },
  {
    provide: tokens.Libp2pWebrtcStar,
    useValue: require('libp2p-webrtc-star'),
  },
  {
    provide: tokens.Libp2pWebsockets,
    useValue: require('libp2p-websockets'),
  },
  ...ipfs,
] as Provider[];
