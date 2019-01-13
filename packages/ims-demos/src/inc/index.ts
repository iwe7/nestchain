import { Injectable, Logger } from 'ims-core';
import { ImsDemo } from '../types';
import { of } from 'ims-rxjs';
@Injectable()
export class ImsDemoImplClient extends ImsDemo {
  constructor(public logger: Logger) {
    super();
  }
  getIndex(name: string) {
    this.logger.info(`request ImsDemo getIndex: ${name}`);
    return of({
      demo: 'test',
      name: name,
    });
  }
  getIndex2(name: string) {
    this.logger.info(`request ImsDemo getIndex2: ${name}`);
    return of({
      demo: 'test',
      name: name,
    });
  }
}
