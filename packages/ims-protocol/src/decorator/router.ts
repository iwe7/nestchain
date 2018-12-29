import { makeDecorator, TypeDecorator } from 'ims-decorator';
export const RouterMetadataKey = 'RouterMetadataKey';
export interface RouterOptions {
  address: string;
}
export interface RouterDecorator {
  (opt?: RouterOptions): TypeDecorator;
}
export const Router: RouterDecorator = makeDecorator(
  RouterMetadataKey,
  'visitRouter',
  dir => dir,
);
