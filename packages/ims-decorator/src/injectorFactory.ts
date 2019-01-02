import { ImsContext } from './context';
import { Type } from 'ims-core';
import { Visitor } from './injector3';
export class ImsInjectorFactory<T = any> {
  instance: T;
  constructor(public visitor: Visitor, public context: ImsContext) {}
  create(type: Type<any>, ...args: any[]) {
    this.instance = this.visitor.create(type, this.context, ...args);
  }
}
