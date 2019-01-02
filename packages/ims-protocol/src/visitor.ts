import { Visitor, injector } from 'ims-decorator';

export class ImsProtocolVisitor extends Visitor {}

export default injector(new ImsProtocolVisitor());
