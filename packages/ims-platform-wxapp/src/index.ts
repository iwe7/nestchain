export * from './module';
export * from './httpBackend';

import { createPlatformFactory, corePlatform } from 'ims-core';

export const platformWxapp = createPlatformFactory(
  corePlatform,
  'ims-platform-wxapp',
  [],
);
