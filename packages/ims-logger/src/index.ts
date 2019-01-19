import { NgModule, Logger, Injector, LogLevel } from 'ims-core';
import { LoggerFactory } from './logger';
export * from './logger_observable';
export * from './logger';

@NgModule({
  providers: [
    {
      provide: Logger,
      useFactory: async (injector: Injector) => {
        let fac = await injector.get<LoggerFactory>(LoggerFactory);
        return fac.create('ims.logger', LogLevel.debug);
      },
      deps: [Injector],
    },
  ],
})
export class ImsLoggerModule {}
