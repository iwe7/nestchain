import { makeDecorator, TypeDecorator } from 'ims-decorator';
export const OptionMetadataKey = 'OptionMetadataKey';
export interface OptionOptions {
  flags: string;
  description?: string;
  defaultValue?: any;
  bool?: boolean;
  fn?: ((arg1: any, arg2: any) => void) | RegExp;
}
export interface OptionDecorator {
  (opt: OptionOptions): TypeDecorator;
}
export const Option: OptionDecorator = makeDecorator(
  OptionMetadataKey,
  'visitOption',
  dir => ({ ...dir }),
);
