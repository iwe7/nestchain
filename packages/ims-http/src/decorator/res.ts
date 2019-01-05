import { makeDecorator, TypeDecorator } from 'ims-decorator';
import { InjectionToken } from 'ims-injector';
export const ResMetadataKey = 'ResMetadataKey';
export interface Res {}
export interface ResDecorator {
  (): TypeDecorator;
  new (): TypeDecorator;
  new (): Res;
  (): Res;
}
export const Res: ResDecorator = makeDecorator(
  ResMetadataKey,
  'visitRes',
  dir => dir,
);

export const ResToken = new InjectionToken('ResToken');
