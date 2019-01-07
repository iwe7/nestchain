import { Visitor, MetadataDef } from 'ims-decorator';
import { MqttServerOptions } from './decorator';
export declare class MqttVisitor extends Visitor {
    visitMqttServer(it: MetadataDef<MqttServerOptions>, parent: any, context: any, opts: any): MetadataDef<any>;
}
