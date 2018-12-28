import {
  makeDecorator,
  TypeDecorator,
  isPropertyMetadata,
  MetadataDef,
} from 'ims-decorator';
export const OptionMetadataKey = 'OptionMetadataKey';
export interface OptionOptions {
  flags: string;
  name?: string;
  defaultValue?: any;
}
export interface OptionDecorator {
  (opt: OptionOptions): TypeDecorator;
}
export const Option: OptionDecorator = makeDecorator(
  OptionMetadataKey,
  'visitOption',
  dir => ({ ...dir }),
  (type, meta: MetadataDef<OptionOptions>) => {
    if (isPropertyMetadata(meta)) {
      meta.metadataDef.name =
        meta.metadataDef.name || (meta.propertyKey as string);
    }
  },
);
