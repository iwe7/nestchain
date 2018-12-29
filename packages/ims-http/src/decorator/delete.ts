import { makeDecorator, TypeDecorator } from 'ims-decorator';
export const DeleteMetadataKey = 'DeleteMetadataKey';
export interface DeleteOptions {
  type: string;
}
export interface DeleteDecorator {
  (opt?: DeleteOptions): TypeDecorator;
}
export const Delete: DeleteDecorator = makeDecorator(
  DeleteMetadataKey,
  'visitDelete',
  dir => dir,
);
