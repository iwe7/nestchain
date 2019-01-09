export abstract class Multibase {
  abstract encode(type: MultibaseType, buf: Buffer): Buffer;
  abstract decode(buf: Buffer | string): Buffer;
  abstract isEncoded(bufOrString: string | Buffer): MultibaseType | false;
}

export enum MultibaseType {
  'base1',
  'base2',
  'base8',
  'base10',
  'base16',
  'base32',
  'base32pad',
  'base32hex',
  'base32hexpad',
  'base32z',
  'base58flickr',
  'base58btc',
  'base64',
  'base64pad',
  'base64url',
  'base64urlpad',
}
