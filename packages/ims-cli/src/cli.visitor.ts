import {
  MetadataDef,
  isClassMetadata,
  isMethodMetadata,
  isPropertyMetadata,
} from 'ims-decorator';
import { Type } from 'ims-core';
import {
  CliOptions,
  CommandOptions,
  OptionOptions,
  ActionOptions,
} from './decorator';
import parser = require('yargs-parser');
let __run = Symbol.for('__run');
export class CliVisitor extends Visitor {
  program = parser(process.argv.slice(2));
  visitCli(meta: MetadataDef<CliOptions>, parent: any, context: any) {
    let options = meta.metadataDef;
    let that = this;
    if (isClassMetadata(meta)) {
      meta.metadataFactory = function(type: Type<any>) {
        return class extends type {
          constructor(...args: any[]) {
            super(...args);
            const commands = Object.keys(options.commands).map(key =>
              that.visitType(options.commands[key], this, null),
            );
            // 匹配commond
            let flags = parser(process.argv.slice(2));
            const { _, ...opts } = flags;
            if (_.length > 0) {
              let command = commands.find(item => item.match(_[0]));
              if (command) {
                that.visitTypeOther(command.target, opts, command);
                command[__run] && command[__run]();
              }
            }
          }
        };
      };
    }
    return meta;
  }

  visitCommand(meta: MetadataDef<CommandOptions>, parent: any, context: any) {
    const options = meta.metadataDef;
    let that = this;
    if (isClassMetadata(meta)) {
      meta.metadataFactory = function(type: Type<any>) {
        type.prototype.target = meta.target;
        type.prototype.match = function(_: string) {
          if (_ === options.name) return true;
          if (_ === options.alias) return true;
          return false;
        };
        return type;
      };
    }
    return meta;
  }

  visitOption(meta: MetadataDef<OptionOptions>, parent: any, context: any) {
    let options = meta.metadataDef;
    if (isPropertyMetadata(meta) && parent) {
      let val = parent[options.flags] || parent[options.name] || null;
      Reflect.defineProperty(context, meta.propertyKey, {
        value: val,
        writable: true,
      });
    }
    return meta;
  }

  visitAction(meta: MetadataDef<ActionOptions>, parent: any, context: any) {
    if (isMethodMetadata(meta) && context) {
      context[__run] = context[meta.propertyKey].bind(context);
    }
    return meta;
  }
}
