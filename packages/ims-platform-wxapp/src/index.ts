/// <reference types="../../ims-types/src/wxapp" />

export * from './module';
export * from './httpBackend';

import {
  createPlatformFactory,
  corePlatform,
  PLATFORM_INITIALIZER,
} from 'ims-core';
import { ImsPlatformWxappModule } from './module';

export const platformWxapp = createPlatformFactory(
  corePlatform,
  'ims-platform-wxapp',
  [
    {
      provide: PLATFORM_INITIALIZER,
      useFactory: () => {
        return () => {
          App({
            onLaunch: function() {
              console.log('App Launch');
            },
            onShow: function() {
              console.log('App Show');
            },
            onHide: function() {
              console.log('App Hide');
            },
            globalData: {
              hasLogin: false,
            },
          });
        };
      },
      multi: true,
    },
  ],
  [ImsPlatformWxappModule],
);
