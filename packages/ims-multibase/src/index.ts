import { MultibaseImpl } from './multibase';
import { Multibase, StaticProvider, Injector, MultibaseType } from 'ims-core';
import * as tokens from './tokens';

import { Base } from './base';
import { createBasex } from 'ims-base-x';
import { Base16 } from './base16';
import { Base32 } from './base32';
export default function createProviders() {
  const provider: StaticProvider[] = [
    {
      provide: Multibase,
      useClass: MultibaseImpl,
      deps: [Injector],
    },
    {
      provide: tokens.base1,
      useFactory: () => {
        return new Base(MultibaseType.base1, '1', '1');
      },
      deps: [],
    },
    {
      provide: tokens.base2,
      useFactory: () => {
        return new Base(MultibaseType.base2, '0', '01', createBasex);
      },
      deps: [],
    },
    {
      provide: tokens.base8,
      useFactory: () => {
        return new Base(MultibaseType.base8, '7', '01234567', createBasex);
      },
      deps: [],
    },
    {
      provide: tokens.base10,
      useFactory: () => {
        return new Base(MultibaseType.base10, '9', '0123456789', createBasex);
      },
      deps: [],
    },
    {
      provide: tokens.base16,
      useFactory: () => {
        return new Base(
          MultibaseType.base16,
          'f',
          '0123456789abcdef',
          (a: string) => {
            return new Base16(a);
          },
        );
      },
      deps: [],
    },
    {
      provide: tokens.base32,
      useFactory: () => {
        return new Base(
          MultibaseType.base32,
          'b',
          'abcdefghijklmnopqrstuvwxyz234567',
          (a: string) => {
            return new Base32(a);
          },
        );
      },
      deps: [],
    },
    {
      provide: tokens.base32pad,
      useFactory: () => {
        return new Base(
          MultibaseType.base32pad,
          'c',
          'abcdefghijklmnopqrstuvwxyz234567=',
          (a: string) => {
            return new Base32(a);
          },
        );
      },
      deps: [],
    },
    {
      provide: tokens.base32hex,
      useFactory: () => {
        return new Base(
          MultibaseType.base32hex,
          'v',
          '0123456789abcdefghijklmnopqrstuv',
          (a: string) => {
            return new Base32(a);
          },
        );
      },
      deps: [],
    },
    {
      provide: tokens.base32hexpad,
      useFactory: () => {
        return new Base(
          MultibaseType.base32hexpad,
          't',
          '0123456789abcdefghijklmnopqrstuv=',
          (a: string) => {
            return new Base32(a);
          },
        );
      },
      deps: [],
    },
    {
      provide: tokens.base32z,
      useFactory: () => {
        return new Base(
          MultibaseType.base32z,
          'h',
          'ybndrfg8ejkmcpqxot1uwisza345h769',
          (a: string) => {
            return new Base32(a);
          },
        );
      },
      deps: [],
    },
    {
      provide: tokens.base58flickr,
      useFactory: () => {
        return new Base(
          MultibaseType.base58flickr,
          'Z',
          '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ',
          createBasex,
        );
      },
      deps: [],
    },
    {
      provide: tokens.base58btc,
      useFactory: () => {
        return new Base(
          MultibaseType.base58btc,
          'z',
          '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
          createBasex,
        );
      },
      deps: [],
    },
    {
      provide: tokens.base64,
      useFactory: () => {
        return new Base(
          MultibaseType.base64,
          'm',
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
          createBasex,
        );
      },
      deps: [],
    },
    {
      provide: tokens.base64pad,
      useFactory: () => {
        return new Base(
          MultibaseType.base64pad,
          'M',
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
          createBasex,
        );
      },
      deps: [],
    },
    {
      provide: tokens.base64url,
      useFactory: () => {
        return new Base(
          MultibaseType.base64url,
          'u',
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_',
          createBasex,
        );
      },
      deps: [],
    },
    {
      provide: tokens.base64urlpad,
      useFactory: () => {
        return new Base(
          MultibaseType.base64urlpad,
          'U',
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=',
          createBasex,
        );
      },
      deps: [],
    },
  ];
  return provider;
}
