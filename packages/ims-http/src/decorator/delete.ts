import { makeDecorator, TypeDecorator } from 'ims-decorator';
export const DeleteMetadataKey = 'DeleteMetadataKey';
export interface DeleteOptions {
  method: 'delete';
  path: string;
}
export interface DeleteDecorator {
  (path?: string): TypeDecorator;
}
export const Delete: DeleteDecorator = makeDecorator(
  DeleteMetadataKey,
  'visitDelete',
  path => ({ method: 'delete', path }),
);
