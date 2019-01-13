import { LoggerModule } from './index';
import { corePlatform, Logger, LoggerFactory } from 'ims-core';

corePlatform().then(res => {
  res.bootstrapModule(LoggerModule).then(res => {
    let injector = res.injector;
    let logger = injector.get<Logger>(Logger);
    let factory = injector.get<LoggerFactory>(LoggerFactory);
    let child = factory.createChild(logger, 'test');
    logger.subscribe(res => {
      console.log(res);
    });
    logger.info('test');
    debugger;
  });
});
