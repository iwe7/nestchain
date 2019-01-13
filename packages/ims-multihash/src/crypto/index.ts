import crypto = require('crypto');
import sha3 = require('js-sha3');
import murmur3 = require('murmurhash3js');
import blake = require('blakejs');
const toBuf = (doWork: any, other?: any) => (input: any) => {
  let result = doWork(input, other);
  return Buffer.from(result, 'hex');
};
const fromString = (doWork: any, other?: any) => (_input: any) => {
  const input = Buffer.isBuffer(_input) ? _input.toString() : _input;
  return doWork(input, other);
};
const fromNumberTo32BitBuf = (doWork: any, other?: any) => (input: any) => {
  let number = doWork(input, other);
  const bytes = new Array(4);
  for (let i = 0; i < 4; i++) {
    bytes[i] = number & 0xff;
    number = number >> 8;
  }
  return Buffer.from(bytes);
};
export const sha1 = (buf: string | Buffer | NodeJS.TypedArray | DataView) =>
  crypto
    .createHash('sha1')
    .update(buf)
    .digest();
export const sha2256 = (buf: string | Buffer | NodeJS.TypedArray | DataView) =>
  crypto
    .createHash('sha256')
    .update(buf)
    .digest();

export const sha2512 = (buf: string | Buffer | NodeJS.TypedArray | DataView) =>
  crypto
    .createHash('sha512')
    .update(buf)
    .digest();
export const dblSha2256 = (
  buf: string | Buffer | NodeJS.TypedArray | DataView,
) => {
  return sha2256(Buffer.from(sha2256(buf)));
};

export const sha3512 = toBuf(sha3.sha3_512);
export const sha3384 = toBuf(sha3.sha3_384);
export const sha3256 = toBuf(sha3.sha3_256);
export const sha3224 = toBuf(sha3.sha3_224);
export const shake128 = toBuf(sha3.shake_128, 128);
export const shake256 = toBuf(sha3.shake_256, 256);
export const keccak224 = toBuf(sha3.keccak_224);
export const keccak256 = toBuf(sha3.keccak_256);
export const keccak384 = toBuf(sha3.keccak_384);
export const keccak512 = toBuf(sha3.keccak_512);
export const murmur3128 = toBuf(fromString(murmur3.x64.hash128));
export const murmur332 = fromNumberTo32BitBuf(fromString(murmur3.x86.hash32));

const minB = 0xb201;
const minS = 0xb241;
const makeB2Hash = (size, hf) => {
  return (buf: any) => {
    const ctx = hf.init(size, null);
    hf.update(ctx, buf);
    return Buffer.from(hf.digest(ctx));
  };
};

const blake2b = {
  init: blake.blake2bInit,
  update: blake.blake2bUpdate,
  digest: blake.blake2bFinal,
};

const blake2s = {
  init: blake.blake2sInit,
  update: blake.blake2sUpdate,
  digest: blake.blake2sFinal,
};

export const addBlake = (table: any) => {
  for (let i = 0; i < 64; i++) {
    table[minB + i] = makeB2Hash(i + 1, blake2b);
  }
  for (let i = 0; i < 32; i++) {
    table[minS + i] = makeB2Hash(i + 1, blake2s);
  }
  return table;
};
