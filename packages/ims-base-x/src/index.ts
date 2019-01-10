import { BaseXFactory, NgModule, InjectionToken, BaseX } from 'ims-core';
import { BaseXFactoryImpl } from './base-x';
export const Base58 = new InjectionToken<BaseX>('base-58');
export const Base10 = new InjectionToken<BaseX>('base-10');
export const Base8 = new InjectionToken<BaseX>('base-8');
export const Base58flickr = new InjectionToken<BaseX>('base-58-flickr');
export const Base58btc = new InjectionToken<BaseX>('base-58-btc');
export const Base64 = new InjectionToken<BaseX>('base-64');
export const Base64pad = new InjectionToken<BaseX>('base-64-pad');
export const Base64url = new InjectionToken<BaseX>('base-64-url');
export const Base64urlpad = new InjectionToken<BaseX>('base-64-url-pad');

@NgModule({
  providers: [
    {
      provide: BaseXFactory,
      useClass: BaseXFactoryImpl,
      deps: [],
    },
    {
      provide: Base58,
      useFactory: (fac: BaseXFactory) => {
        return fac.create(
          '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
        );
      },
      deps: [BaseXFactory],
    },
    {
      provide: Base8,
      useFactory: (fac: BaseXFactory) => {
        return fac.create('01234567');
      },
      deps: [BaseXFactory],
    },
    {
      provide: Base10,
      useFactory: (fac: BaseXFactory) => {
        return fac.create('0123456789');
      },
      deps: [BaseXFactory],
    },
    {
      provide: Base58flickr,
      useFactory: (fac: BaseXFactory) => {
        return fac.create(
          '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ',
        );
      },
      deps: [BaseXFactory],
    },
    {
      provide: Base58btc,
      useFactory: (fac: BaseXFactory) => {
        return fac.create(
          '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
        );
      },
      deps: [BaseXFactory],
    },
    {
      provide: Base64,
      useFactory: (fac: BaseXFactory) => {
        return fac.create(
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
        );
      },
      deps: [BaseXFactory],
    },
    {
      provide: Base64pad,
      useFactory: (fac: BaseXFactory) => {
        return fac.create(
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
        );
      },
      deps: [BaseXFactory],
    },
    {
      provide: Base64url,
      useFactory: (fac: BaseXFactory) => {
        return fac.create(
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_',
        );
      },
      deps: [BaseXFactory],
    },
    {
      provide: Base64urlpad,
      useFactory: (fac: BaseXFactory) => {
        return fac.create(
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=',
        );
      },
      deps: [BaseXFactory],
    },
  ],
})
export class BaseXModule {}
