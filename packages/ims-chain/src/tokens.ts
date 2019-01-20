import { InjectionToken } from 'ims-core';
// todo remove any
export interface IpfsOptions {
  repo: string | any;
  init: boolean;
  start: boolean;
  EXPERIMENTAL: any;
  preload: {
    enabled: boolean;
    addresses: string[];
  };
}
/**
 * 配置参数
 */
export const IpfsOptions = new InjectionToken<IpfsOptions>('IpfsOptions');
/**
 * 日志打印
 */
export const IpfsLog = new InjectionToken('IpfsLog');
/**
 * 错误日志
 */
export const IpfsLogErr = new InjectionToken('IpfsLogErr');

/**
 * 类型
 */
// todo remove any
export interface IpfsType {
  Buffer: any;
  PeerId: any;
  PeerInfo: any;
  multiaddr: any;
  multibase: any;
  multihash: any;
  CID: any;
}
export const IpfsTypes = new InjectionToken<IpfsType>('IpfsTypes');

// todo remove any
export interface IpfsUtil {
  crypto: any;
  isIPFS: any;
}
export const IpfsUtil = new InjectionToken<IpfsUtil>('IpfsUtil');
export const IpfsPeerBook = new InjectionToken('IpfsPeerBook');
export const IpfsPeerInfo = new InjectionToken('IpfsPeerInfo');
export const IpfsLibp2pNode = new InjectionToken('IpfsLibp2pNode');
export const IpfsBitswap = new InjectionToken('IpfsBitswap');
export const IpfsBlockService = new InjectionToken('IpfsBlockService');
export const IpfsIpld = new InjectionToken('IpfsIpld');
export const IpfsIpns = new InjectionToken('IpfsIpns');
export const IpfsPreStart = new InjectionToken('IpfsPreStart');
export const IpfsStart = new InjectionToken('IpfsStart');
export const IpfsStop = new InjectionToken('IpfsStop');
export const IpfsShutdown = new InjectionToken('IpfsShutdown');
export const IpfsIsOnline = new InjectionToken('IpfsIsOnline');
export const IpfsPreload = new InjectionToken('IpfsPreload');
export const IpfsMfsPreload = new InjectionToken('IpfsMfsPreload');
export const IpfsPrint = new InjectionToken('IpfsPrint');
export const IpfsInit = new InjectionToken('IpfsInit');
export const IpfsVersion = new InjectionToken('IpfsVersion');
export const IpfsId = new InjectionToken('IpfsId');
export const IpfsRepo = new InjectionToken('IpfsRepo');
export const IpfsBootstrap = new InjectionToken('IpfsBootstrap');
export const IpfsConfig = new InjectionToken('IpfsConfig');
export const IpfsBlock = new InjectionToken('IpfsBlock');
export const IpfsObject = new InjectionToken('IpfsObject');
export const IpfsDag = new InjectionToken('IpfsDag');
export const IpfsFiles = new InjectionToken('IpfsFiles');
export const IpfsLibp2p = new InjectionToken('IpfsLibp2p');
export const IpfsSwarm = new InjectionToken('IpfsSwarm');
export const IpfsName = new InjectionToken('IpfsName');
export const IpfsPing = new InjectionToken('IpfsPing');
export const IpfsPin = new InjectionToken('IpfsPin');
export const IpfsPingPullStream = new InjectionToken('IpfsPingPullStream');
export const IpfsPingReadableStream = new InjectionToken('IpfsPingReadableStream');
