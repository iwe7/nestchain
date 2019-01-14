import { Injectable } from 'ims-core';
import crypto = require('crypto');
import stream = require('stream');

@Injectable({
  providedIn: 'root',
})
export class Ciphers {
  createCipheriv(
    algorithm: crypto.CipherCCMTypes,
    key: string | Buffer | NodeJS.TypedArray | DataView,
    iv: string | Buffer | NodeJS.TypedArray | DataView,
    options: crypto.CipherCCMOptions,
  ): crypto.CipherCCM;
  createCipheriv(
    algorithm: crypto.CipherGCMTypes,
    key: string | Buffer | NodeJS.TypedArray | DataView,
    iv: string | Buffer | NodeJS.TypedArray | DataView,
    options?: crypto.CipherGCMOptions,
  ): crypto.CipherGCM;
  createCipheriv(
    algorithm: string,
    key: string | Buffer | NodeJS.TypedArray | DataView,
    iv: string | Buffer | NodeJS.TypedArray | DataView,
    options?: stream.TransformOptions,
  ): crypto.Cipher;
  createCipheriv(
    algorithm: string | crypto.CipherGCMTypes | crypto.CipherCCMTypes,
    key: string | Buffer | NodeJS.TypedArray | DataView,
    iv: string | Buffer | NodeJS.TypedArray | DataView,
    options:
      | stream.TransformOptions
      | crypto.CipherGCMOptions
      | crypto.CipherCCMOptions,
  ): crypto.CipherCCM | crypto.CipherGCM | crypto.Cipher {
    return crypto.createCipheriv(algorithm, key, iv, options);
  }

  createDecipheriv(
    algorithm: crypto.CipherCCMTypes,
    key: string | Buffer | NodeJS.TypedArray | DataView,
    iv: string | Buffer | NodeJS.TypedArray | DataView,
    options: crypto.CipherCCMOptions,
  ): crypto.DecipherCCM;
  createDecipheriv(
    algorithm: crypto.CipherGCMTypes,
    key: string | Buffer | NodeJS.TypedArray | DataView,
    iv: string | Buffer | NodeJS.TypedArray | DataView,
    options?: crypto.CipherGCMOptions,
  ): crypto.DecipherGCM;
  createDecipheriv(
    algorithm: string,
    key: string | Buffer | NodeJS.TypedArray | DataView,
    iv: string | Buffer | NodeJS.TypedArray | DataView,
    options?: stream.TransformOptions,
  ): crypto.Decipher;
  createDecipheriv(
    algorithm: string | crypto.CipherGCMTypes | crypto.CipherCCMTypes,
    key: string | Buffer | NodeJS.TypedArray | DataView,
    iv: string | Buffer | NodeJS.TypedArray | DataView,
    options?:
      | stream.TransformOptions
      | crypto.CipherGCMOptions
      | crypto.CipherCCMOptions,
  ): crypto.Decipher | crypto.DecipherGCM | crypto.DecipherCCM {
    return crypto.createDecipheriv(algorithm, key, iv, options);
  }
}
