import crypto = require('crypto');
import stream = require('stream');

export class ImsCryptoHash {
  createString(algorithm: string, options?: stream.TransformOptions) {
    let hash = crypto.createHash(algorithm, options);
    return (
      data: string | Buffer | NodeJS.TypedArray | DataView,
      encoding: crypto.HexBase64Latin1Encoding = 'hex',
    ) => hash.update(data).digest(encoding);
  }
}
