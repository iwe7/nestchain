import { MultibaseImpl } from './multibase';
import {
  Multibase,
  Injector,
  MultibaseType,
  NgModule,
  BaseXFactory,
} from 'ims-core';
import * as tokens from './tokens';

import { Base } from './base';
import { BaseXModule } from 'ims-base-x';
import { Base16 } from './base16';
import { Base32 } from './base32';

@NgModule({
  imports: [BaseXModule],
  providers: [
    {
      provide: Multibase,
      useFactory: (injector: Injector) => new MultibaseImpl(injector),
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
      useFactory: (fac: BaseXFactory) => {
        return new Base(MultibaseType.base2, '0', '01', fac.create);
      },
      deps: [BaseXFactory],
    },
    {
      provide: tokens.base8,
      useFactory: (fac: BaseXFactory) => {
        return new Base(MultibaseType.base8, '7', '01234567', fac.create);
      },
      deps: [BaseXFactory],
    },
    {
      provide: tokens.base10,
      useFactory: (fac: BaseXFactory) => {
        return new Base(MultibaseType.base10, '9', '0123456789', fac.create);
      },
      deps: [BaseXFactory],
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
      useFactory: (fac: BaseXFactory) => {
        return new Base(
          MultibaseType.base58flickr,
          'Z',
          '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ',
          fac.create,
        );
      },
      deps: [BaseXFactory],
    },
    {
      provide: tokens.base58btc,
      useFactory: (fac: BaseXFactory) => {
        return new Base(
          MultibaseType.base58btc,
          'z',
          '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
          fac.create,
        );
      },
      deps: [BaseXFactory],
    },
    {
      provide: tokens.base64,
      useFactory: (fac: BaseXFactory) => {
        return new Base(
          MultibaseType.base64,
          'm',
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
          fac.create,
        );
      },
      deps: [BaseXFactory],
    },
    {
      provide: tokens.base64pad,
      useFactory: (fac: BaseXFactory) => {
        return new Base(
          MultibaseType.base64pad,
          'M',
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
          fac.create,
        );
      },
      deps: [BaseXFactory],
    },
    {
      provide: tokens.base64url,
      useFactory: (fac: BaseXFactory) => {
        return new Base(
          MultibaseType.base64url,
          'u',
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_',
          fac.create,
        );
      },
      deps: [BaseXFactory],
    },
    {
      provide: tokens.base64urlpad,
      useFactory: (fac: BaseXFactory) => {
        return new Base(
          MultibaseType.base64urlpad,
          'U',
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=',
          fac.create,
        );
      },
      deps: [BaseXFactory],
    },
  ],
})
export class MultibaseModule {}
