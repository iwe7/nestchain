import { makeDecorator, TypeDecorator } from 'ims-decorator';
export const ParamMetadataKey = 'ParamMetadataKey';
export interface ParamOptions {
  name?: string;
  other?: boolean;
}
export interface ParamDecorator {
  (opt?: ParamOptions): TypeDecorator;
}
export const Param: ParamDecorator = makeDecorator(
  ParamMetadataKey,
  'visitParam',
  dir => ({
    ...dir,
  }),
);
