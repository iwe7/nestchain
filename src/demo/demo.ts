import { corePlatform, NgModule } from 'ims-core';
/**
 * 为了hot loader
 */
import './index.html';
export function add(a, b) {
  return a + b;
}
export const version = 1.0;

let res = add(1, 2);
console.log(version);
console.log(res);

@NgModule()
export class ImsDemo {}

corePlatform()
  .then(res => res.bootstrapModule(ImsDemo))
  .then(res => {
    console.log('platform bootstrap success');
  });
