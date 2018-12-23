import { makeDecorator, TypeDecorator, isClassMetadata } from 'ims-decorator';
import { IInjector } from 'ims-core';
export const MqttServerMetadataKey = 'MqttServerMetadataKey';
let port = 5000;
export type LoadOptions = any;
export type MqttServerOptions = any;
export interface MqttServerDecorator {
  (opt: MqttServerOptions): TypeDecorator;
}
export const MqttServer: MqttServerDecorator = makeDecorator(
  MqttServerMetadataKey,
  'visitMqttServer',
  dir => dir,
  (type, meta) => {
    if (isClassMetadata(meta)) {
    }
  },
);
