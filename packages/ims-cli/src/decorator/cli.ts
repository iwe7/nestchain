import { makeDecorator, TypeDecorator } from 'ims-decorator';
import { IInjector } from 'ims-core';
export const CliMetadataKey = 'CliMetadataKey';
export interface CliOptions {
  name?: string;
  version?: string;
  description?: string;
  commands?: IInjector;
}
export interface CliDecorator {
  (opt: CliOptions): TypeDecorator;
}
export const Cli: CliDecorator = makeDecorator(
  CliMetadataKey,
  'visitCli',
  dir => ({ commands: [], ...dir }),
);
