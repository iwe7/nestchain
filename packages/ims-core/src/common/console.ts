export abstract class Console {
  abstract time(reportName?: string): void;
  abstract timeEnd(reportName?: string): void;
  abstract assert(test: boolean, message?: string): void;
  abstract info(message: any): void;
  abstract warn(message: any): void;
  abstract error(message: any): void;
  abstract log(message: any): void;
  abstract trace(): void;
  abstract dir(obj: any): void;
}
