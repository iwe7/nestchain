import asm = require('asmcrypto.js');
import { setImmediate } from 'async';

export function create(key, iv, callback) {
  const done = (err: Error, res?: any) =>
    setImmediate(() => callback(err, res));
  if (key.length !== 16 && key.length !== 32) {
    return done(new Error('Invalid key length'));
  }
  // const enc = new asm.AES_CTR.encrypt({
  //   key: key,
  //   nonce: iv,
  // });
  // const dec = new asm.AES_CTR.decrypt({
  //   key: key,
  //   nonce: iv,
  // });
  const res = {
    encrypt(data, cb) {
      const done = (err, res?: any) => setImmediate(() => cb(err, res));
      let res;
      try {
        res = Buffer.from(enc.process(data).result);
      } catch (err) {
        return done(err);
      }
      done(null, res);
    },
    decrypt(data, cb) {
      const done = (err, res) => setImmediate(() => cb(err, res));
      let res;
      try {
        res = Buffer.from(dec.process(data).result);
      } catch (err) {
        return done(err);
      }
      done(null, res);
    },
  };
  done(null, res);
}
