import { createPlatformFactory, corePlatform } from 'ims-core';
export const platformBrowser = createPlatformFactory(
  corePlatform,
  'browser',
);
