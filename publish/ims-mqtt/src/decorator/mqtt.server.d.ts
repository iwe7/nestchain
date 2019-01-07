import { TypeDecorator } from 'ims-decorator';
export declare const MqttServerMetadataKey = "MqttServerMetadataKey";
export declare type MqttServerOptions = any;
export interface MqttServerDecorator {
    (opt: MqttServerOptions): TypeDecorator;
}
export declare const MqttServer: MqttServerDecorator;
