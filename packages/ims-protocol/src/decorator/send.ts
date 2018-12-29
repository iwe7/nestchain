import { makeDecorator, TypeDecorator } from 'ims-decorator';
export const SendMetadataKey = 'SendMetadataKey';
export interface SendOptions {
  type: string;
}
export interface SendDecorator {
  (opt?: SendOptions): TypeDecorator;
}
export const Send: SendDecorator = makeDecorator(
  SendMetadataKey,
  'visitSend',
  dir => dir,
);
