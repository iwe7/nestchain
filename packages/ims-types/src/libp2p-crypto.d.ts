declare module 'libp2p-crypto' {
  class Crypto {
    static aes: any;
    static hmac: any;
    static keys: any;
    static randomBytes: any;
    static pbkdf2: any;
  }
  export = Crypto;
}
