import * as tokens from './tokens';
import { Injector, MultibaseType } from 'ims-core';
import { Base } from './base';
export function getBase(injector: Injector, type: MultibaseType): Base {
  let token = tokens[type];
  if (!token) {
    token = tokens[MultibaseType[type]];
  }
  if (!token) {
    type = getCode(type as any);
    token = tokens[MultibaseType[type]];
  }
  if (!token) {
    throw new Error(`token is not found ${type}`);
  }
  return injector.get<Base>(token);
}

export function getCode(code: string) {
  return {
    [`1`]: MultibaseType.base1,
    [`0`]: MultibaseType.base2,
    [`7`]: MultibaseType.base8,
    [`9`]: MultibaseType.base10,
    [`f`]: MultibaseType.base16,
    [`b`]: MultibaseType.base32,
    [`c`]: MultibaseType.base32pad,
    [`v`]: MultibaseType.base32hex,
    [`t`]: MultibaseType.base32hexpad,
    [`h`]: MultibaseType.base32z,
    [`Z`]: MultibaseType.base58flickr,
    [`z`]: MultibaseType.base58btc,
    [`m`]: MultibaseType.base64,
    [`M`]: MultibaseType.base64pad,
    [`u`]: MultibaseType.base64url,
    [`U`]: MultibaseType.base64urlpad,
  }[code];
}
