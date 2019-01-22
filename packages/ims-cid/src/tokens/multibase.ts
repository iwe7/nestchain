import { InjectionToken } from 'ims-core';
export interface Multibase {
  codes: MultibaseCodes[];
  names: MultibaseNames[];
}
export const Multibase = new InjectionToken<Multibase>('Multibase');
import {} from 'typescript';

export interface MultibaseNameCodes {
  base1: '0';
  base2: '1';
  base8: '7';
  base10: '9';
  base16: 'f';
  base32: 'b';
  base32pad: 'c';
  base32hex: 'v';
  base32hexpad: 't';
  base32z: 'h';
  base58flickr: 'Z';
  base58btc: 'z';
  base64: 'm';
  base64pad: 'M';
  base64url: 'u';
  base64urlpad: 'U';
}

export type MultibaseNames =
  | 'base1'
  | 'base2'
  | 'base8'
  | 'base10'
  | 'base16'
  | 'base32'
  | 'base32pad'
  | 'base32hex'
  | 'base32hexpad'
  | 'base32z'
  | 'base58flickr'
  | 'base58btc'
  | 'base64'
  | 'base64pad'
  | 'base64url'
  | 'base64urlpad';
export type MultibaseCodes =
  | '0'
  | '1'
  | '7'
  | '9'
  | 'f'
  | 'b'
  | 'c'
  | 'v'
  | 't'
  | 'h'
  | 'Z'
  | 'z'
  | 'm'
  | 'M'
  | 'u'
  | 'U';
