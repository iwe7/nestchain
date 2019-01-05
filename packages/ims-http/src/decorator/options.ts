import { makeDecorator, TypeDecorator } from 'ims-decorator';
export const OptionsMetadataKey = 'OptionsMetadataKey';
export interface OptionsOptions {
  method: 'options';
  path: string;
}
export interface OptionsDecorator {
  (path?: string): TypeDecorator;
}
export const Options: OptionsDecorator = makeDecorator(
  OptionsMetadataKey,
  'visitOptions',
  path => ({ path, method: 'options' }),
);
