import { InjectionToken } from 'ims-core';
export interface IpldGit {
  util: any;
  resolver: IpldGitResolver;
}
export const IpldGit = new InjectionToken('IpldGit');

export interface IpldGitResolver {
  multicodec: 'git-raw';
  defaultHashAlg: 'sha1';
  resolve: any;
  tree: any;
  isLink: any;
}

export interface IpldGitUtil {
  serialize: any;
  deserialize: any;
  cid: any;
}
