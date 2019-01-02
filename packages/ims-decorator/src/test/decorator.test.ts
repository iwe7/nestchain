import { Visitor, injector } from '../injector3';
import { Module } from './module';
import 'reflect-metadata';
import { ImsContext } from '../context';

@Module({
  deps: [],
})
export class TestModule1 {}

@Module({
  deps: [TestModule1],
})
export class TestModule2 {}

let visitor = new Visitor();
let context = new ImsContext();
const instance = injector(visitor)(TestModule2, context);
debugger;
