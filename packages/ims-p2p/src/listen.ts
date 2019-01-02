import { ListenOptions } from 'net';
import { TypeDecorator, makeDecorator } from 'ims-decorator';
export { ListenOptions };
export interface ListenDecorator {
  (opt: ListenOptions): TypeDecorator;
}
export const ListenMetadataKey = 'ListenMetadataKey';
export const Listen: ListenDecorator = makeDecorator(
  ListenMetadataKey,
  'visitListen',
  dir => dir,
);
