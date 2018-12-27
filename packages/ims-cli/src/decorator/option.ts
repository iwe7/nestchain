import { makeDecorator, TypeDecorator } from 'ims-decorator';
export const OptionMetadataKey = 'OptionMetadataKey';
export interface OptionOptions {
  flags: string;
  defaultValue?: any;
}
export interface OptionDecorator {
  (opt: OptionOptions): TypeDecorator;
}
export const Option: OptionDecorator = makeDecorator(
  OptionMetadataKey,
  'visitOption',
  dir => ({ ...dir }),
);
