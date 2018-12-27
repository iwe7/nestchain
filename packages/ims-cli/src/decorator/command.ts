import { makeDecorator, TypeDecorator } from 'ims-decorator';
export const CommandMetadataKey = 'CommandMetadataKey';
export interface CommandOptions {
  name: string;
  alias?: string;
}
export interface CommandDecorator {
  (opt: CommandOptions): TypeDecorator;
}
export const Command: CommandDecorator = makeDecorator(
  CommandMetadataKey,
  'visitCommand',
  dir => dir
);
