import { Module } from 'ims-nest';
export class Demo {
  constructor(...args: any[]) {}
}
@Module({
  controllers: [],
})
export class ImsAccount extends Demo {
  constructor(...args: any[]) {
    super(...args);
  }
}
