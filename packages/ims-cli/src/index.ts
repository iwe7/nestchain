import { injector as _injector } from 'ims-decorator';
import { CliVisitor } from './cli.visitor';
export const injector = _injector(new CliVisitor());
export * from './decorator/index';
