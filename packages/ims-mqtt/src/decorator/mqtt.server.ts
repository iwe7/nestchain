import { makeDecorator, TypeDecorator, isClassMetadata } from 'ims-decorator';
export const MqttServerMetadataKey = 'MqttServerMetadataKey';
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
