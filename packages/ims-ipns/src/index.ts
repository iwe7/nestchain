import { Injectable } from 'ims-core';
@Injectable({
  providedIn: 'root',
})
export class ImsIpns {
  get root() {
    return this._rootHash;
  }
  get domain() {
    return this._domain;
  }
  constructor(public _rootHash: string, private _domain: string) {}
  get(name: string) {}
}

export class ImsIpnsFactory {
  /**
   * 创建ipns
   * @param dir 本地文件
   * @param name 唯一域名
   */
  create(dir: string, domain: string): ImsIpns {
    /**
     * 1. 检测dir中内容
     * 2. 遍历文件夹中的内容，计算rootHash,并生成map
     * 3. 生成merkle树，计算rootHash
     */
    let hashMap: Map<Path, Hash> = new Map();
    let rootHash = '';
    return new ImsIpns(rootHash, domain);
  }
}

// cid编码 cid版本号:文件类型:文件内容

type Path = string;
type Hash = string;
