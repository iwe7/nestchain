import { makeDecorator, TypeDecorator } from 'ims-decorator';
export const OptionsMetadataKey = 'OptionsMetadataKey';
export interface OptionsOptions {
  type: string;
}
export interface OptionsDecorator {
  (opt?: OptionsOptions): TypeDecorator;
}
export const Options: OptionsDecorator = makeDecorator(
  OptionsMetadataKey,
  'visitOptions',
  dir => dir,
);
