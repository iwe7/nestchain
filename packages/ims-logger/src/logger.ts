import {
  Logger as CoreLogger,
  JsonObject,
  LogLevel,
  Injectable,
} from 'ims-core';
import { LoggerMetadata, LogEntry } from './type';

export class Logger<T> extends CoreLogger {
  protected _metadata: LoggerMetadata;
  constructor(public name: string, public level: LogLevel) {
    super();
    const path: string[] = [];
    let p = parent;
    while (p) {
      path.push(p.name);
      p = p.parent;
    }
    this._metadata = { name, path };
  }
  createChild(name: string): Logger<T> {
    return new Logger<T>(name, this.level);
  }
  log(level: LogLevel, message: string, metadata?: JsonObject): void {
    const entry: LogEntry = Object.assign({}, this._metadata, metadata, {
      level,
      message,
      timestamp: +Date.now(),
    });
    if (level < this.level) {
      switch (level) {
        case LogLevel.debug:
          return console.debug(entry);
        case LogLevel.error:
          return console.error(entry);
        case LogLevel.info:
          return console.info(entry);
        case LogLevel.warn:
          return console.warn(entry);
        case LogLevel.fatal:
        default:
          return console.log(entry);
      }
    }
  }
  debug(message: string, metadata?: JsonObject): void {
    return this.log(LogLevel.debug, message, metadata);
  }
  info(message: string, metadata?: JsonObject): void {
    return this.log(LogLevel.info, message, metadata);
  }
  warn(message: string, metadata?: JsonObject): void {
    return this.log(LogLevel.warn, message, metadata);
  }
  error(message: string, metadata?: JsonObject): void {
    return this.log(LogLevel.error, message, metadata);
  }
  fatal(message: string, metadata?: JsonObject): void {
    return this.log(LogLevel.fatal, message, metadata);
  }
}

@Injectable({
  providedIn: 'root',
})
export class LoggerFactory {
  create(name: string, level: LogLevel) {
    return new Logger(name, level);
  }
  createChild(parent: Logger<any>, name: string) {
    return parent.createChild(name);
  }
}
