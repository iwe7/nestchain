export enum LogLevel {
  error,
  warn,
  fatal,
  info,
  debug,
}
import { JsonObject } from '../json/index';
/**
 * ims-logger
 */
import { Observable } from 'ims-rxjs';
export abstract class Logger extends Observable<any> {
  abstract createChild(name: string): Logger;
  abstract log(level: LogLevel, message: string, metadata?: JsonObject): void;
  abstract debug(message: string, metadata?: JsonObject): void;
  abstract info(message: string, metadata?: JsonObject): void;
  abstract warn(message: string, metadata?: JsonObject): void;
  abstract error(message: string, metadata?: JsonObject): void;
  abstract fatal(message: string, metadata?: JsonObject): void;
}

export abstract class LoggerFactory {
  abstract create(name: string): Logger;

  abstract createChild(parent: Logger, name: string): Logger;
}
