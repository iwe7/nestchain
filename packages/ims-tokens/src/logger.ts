import { Injectable, InjectionToken, Type } from 'ims-core';

type Format =
  | string
  | ((req: any, res: any, formatter: ((str: string) => string)) => string);

export interface Log4js {
  getLogger(category?: string): Logger;
  configure(filename: string): Log4js;
  configure(config: Configuration): Log4js;
  addLayout(
    name: string,
    config: (a: any) => (logEvent: LoggingEvent) => string,
  ): void;
  connectLogger(
    logger: Logger,
    options: { format?: Format; level?: string; nolog?: any },
  ): any; // express.Handler;
  levels: Levels;
  shutdown(cb: (error: Error) => void): void | null;
}

export interface BaseLayout {
  type: 'basic';
}

export interface ColoredLayout {
  type: 'colored' | 'coloured';
}

export interface MessagePassThroughLayout {
  type: 'messagePassThrough';
}

export interface DummyLayout {
  type: 'dummy';
}

export interface Level {
  isEqualTo(other: string): boolean;
  isEqualTo(otherLevel: Level): boolean;
  isLessThanOrEqualTo(other: string): boolean;
  isLessThanOrEqualTo(otherLevel: Level): boolean;
  isGreaterThanOrEqualTo(other: string): boolean;
  isGreaterThanOrEqualTo(otherLevel: Level): boolean;
}

export interface LoggingEvent {
  categoryName: string; // name of category
  level: Level; // level of message
  data: any[]; // objects to log
  startTime: Date;
  pid: number;
  context: any;
  cluster?: {
    workerId: number;
    worker: number;
  };
}

export type Token = ((logEvent: LoggingEvent) => string) | string;

export interface PatternLayout {
  type: 'pattern';
  // specifier for the output format, using placeholders as described below
  pattern: string;
  // user-defined tokens to be used in the pattern
  tokens?: { [name: string]: Token };
}

export interface CustomLayout {
  [key: string]: any;
  type: string;
}

export type Layout =
  | BaseLayout
  | ColoredLayout
  | MessagePassThroughLayout
  | DummyLayout
  | PatternLayout
  | CustomLayout;

export interface CategoryFilterAppender {
  type: 'categoryFilter';
  exclude?: string | string[];
  appender?: string;
}

export interface ConsoleAppender {
  type: 'console';
  layout?: Layout;
}

export interface FileAppender {
  type: 'file';
  filename: string;
  maxLogSize?: number | string;
  backups?: number;
  layout?: Layout;
  numBackups?: number;
  compress?: boolean; // compress the backups
  keepFileExt?: boolean;
  encoding?: string;
  mode?: number;
  flags?: string;
}

export interface SyncfileAppender {
  type: 'fileSync';
  filename: string;
  maxLogSize?: number | string;
  backups?: number;
  layout?: Layout;
}

export interface DateFileAppender {
  type: 'dateFile';
  filename: string;
  layout?: Layout;
  pattern?: string;
  encoding?: string;
  mode?: number;
  flags?: string;
  compress?: boolean;
  alwaysIncludePattern?: boolean;
  keepFileExt?: boolean;
  daysToKeep?: number;
}

export interface LogLevelFilterAppender {
  type: 'logLevelFilter';
  appender: string;
  level: string;
  maxLevel?: string;
}

export interface MultiFileAppender {
  type: 'multiFile';
  base: string;
  property: string;
  extension: string;
}

export interface MultiprocessAppender {
  type: 'multiprocess';
  mode: 'master' | 'worker';
  appender?: string;
  loggerPort?: number;
  loggerHost?: string;
}

export interface RecordingAppender {
  type: 'recording';
}

export interface StandardErrorAppender {
  type: 'stderr';
  layout?: Layout;
}

export interface StandardOutputAppender {
  type: 'stdout';
  layout?: Layout;
}

export interface CustomAppender {
  type: string;
  [key: string]: any;
}

export type Appender =
  | CategoryFilterAppender
  | ConsoleAppender
  | FileAppender
  | SyncfileAppender
  | DateFileAppender
  | LogLevelFilterAppender
  | MultiFileAppender
  | MultiprocessAppender
  | RecordingAppender
  | StandardErrorAppender
  | StandardOutputAppender
  | CustomAppender;

export interface Levels {
  ALL: Level;
  MARK: Level;
  TRACE: Level;
  DEBUG: Level;
  INFO: Level;
  WARN: Level;
  ERROR: Level;
  FATAL: Level;
  OFF: Level;
  levels: Level[];
  getLevel(level: string): Level;
}

export interface Configuration {
  appenders: { [name: string]: Appender };
  categories: { [name: string]: { appenders: string[]; level: string } };
  pm2?: boolean;
  pm2InstanceVar?: string;
  levels?: Levels;
  disableClustering?: boolean;
}

export interface Logger {
  new (dispatch: Function, name: string): Logger;
  level: string;
  log(...args: any[]): void;
  isLevelEnabled(level?: string): boolean;
  isTraceEnabled(): boolean;
  isDebugEnabled(): boolean;
  isInfoEnabled(): boolean;
  isWarnEnabled(): boolean;
  isErrorEnabled(): boolean;
  isFatalEnabled(): boolean;
  _log(level: string, data: any): void;
  addContext(key: string, value: any): void;
  removeContext(key: string): void;
  clearContext(): void;
  trace(message: any, ...args: any[]): void;
  debug(message: any, ...args: any[]): void;
  info(message: any, ...args: any[]): void;
  warn(message: any, ...args: any[]): void;
  error(message: any, ...args: any[]): void;
  fatal(message: any, ...args: any[]): void;
}

export const Logger = new InjectionToken<Type<Logger>>('Logger');

export interface LoggerFactory {
  getLogger(category?: string): Logger;
  configure(filename: string): Log4js;
  configure(config: Configuration): Log4js;
  addLayout(
    name: string,
    config: (a: any) => (logEvent: LoggingEvent) => string,
  ): void;
  connectLogger(
    logger: Logger,
    options: { format?: Format; level?: string; nolog?: any },
  ): any; // express.Handler;
  levels: Levels;
  shutdown(cb?: (error: Error) => void): void | null;
}
export const LoggerFactory = new InjectionToken('LoggerFactory');
