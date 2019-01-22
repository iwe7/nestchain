import {
  NgModule,
  AppInitialization,
  Injector,
  ErrorHandler,
  AppStartup,
} from 'ims-core';

import { app, dialog } from 'electron';
import { autoUpdater } from 'electron-updater';
import { ImsPromise } from 'ims-util';
import {} from 'ims-child_process';
@NgModule({
  providers: [
    {
      provide: AppInitialization,
      useValue: async (injector: Injector) => {
        if (app) {
          app.setAppUserModelId('io.ipfs.desktop');
          if (!app.requestSingleInstanceLock()) {
            dialog.showErrorBox(
              'Multiple instances',
              'Sorry, but there can be only one instance of IPFS Desktop running at the same time.',
            );
            // No windows were opened at this time so we don't need to do app.quit()
            process.exit(1);
          }
          let handleError = await injector.get(ErrorHandler);
          if (Injector.isNull(handleError)) {
            handleError = e => console.log(e);
          }
          process.on('uncaughtException', e => handleError(e));
          process.on('unhandledRejection', e => handleError(e));

          async function checkUpdates() {
            try {
              autoUpdater.allowPrerelease = true;
              autoUpdater.checkForUpdatesAndNotify().catch(e => handleError(e));
            } catch (e) {
              handleError(e);
            }
          }

          async function run() {
            try {
              await app.whenReady();
            } catch (e) {
              dialog.showErrorBox('Electron could not start', e.stack);
              app.exit(1);
            }
            checkUpdates();
            try {
              let startup = await injector.get(AppStartup);
              if (Injector.isNull(startup)) {
                startup = () => {
                  let ims = new ImsPromise<void>();
                  ims.next();
                  return ims.promise;
                };
              }
              await startup();
            } catch (e) {
              handleError(e);
            }
          }
          run();
        }
      },
      multi: true,
    },
  ],
})
export class ImsPlatformElectronModule {}
