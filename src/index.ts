import { ImsPlatformElectronModule } from 'ims-platform-electron';
import { bootstrapModule, NgModule, AppConfig } from 'ims-core';

@NgModule({
  providers: [
    {
      provide: AppConfig,
      useValue: {
        name: 'CloudDisk',
        mode: 'development',
        version: '1.0.0',
        target: 'electron',
      } as AppConfig,
      multi: true,
    },
  ],
  imports: [ImsPlatformElectronModule],
})
export class ImsCloudDiskModule {}
bootstrapModule(ImsCloudDiskModule);
