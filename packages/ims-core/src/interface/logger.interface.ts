export interface LoggerService {
  log(message: any, context?: string): any;
  error(message: any, trace?: string, context?: string): any;
  warn(message: any, context?: string): any;
}
