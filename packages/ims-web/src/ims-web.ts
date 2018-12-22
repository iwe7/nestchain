export class ImsWeb {
  version: any;
  net: any;
  /**
   * 包含以太坊区块链相关的方法
   */
  eth: any;
  db: any;
  get isConnected() {
    return false;
  }
  setProvider() {}
  currentProvider() {}

  reset() {}
  sha3() {}
  toHex() {}
  toAscii() {}
  fromAscii() {}
  toDecimal() {}
  fromDecimal() {}
  fromWei() {}
  toWei() {}
  toBigNumber() {}
}
