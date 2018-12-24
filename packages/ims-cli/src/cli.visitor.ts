import {
  Visitor,
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
  ParamOptions,
} from './decorator';
import commander = require('commander');
import parser = require('yargs-parser');

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
            commander
              .name(options.name)
              .version(options.version)
              .description(options.description);
            Object.keys(options.commands).map(key =>
              that.visitType(options.commands[key], this, null),
            );
            commander.parse(process.argv);
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
        return class extends type {
          name: string = options.name;
          action: string;
          constructor(...args: any[]) {
            super(...args);
            let { name, desc, alias, ...option } = options;
            that.visitTypeOther(meta.target, parent, this);
            commander
              .command(this.name, desc, option)
              .alias(alias)
              .action((...args: any[]) => {
                this[this.action]();
              });
          }
        };
      };
    }
    return meta;
  }

  visitOption(meta: MetadataDef<OptionOptions>, parent: any, context: any) {
    const options = meta.metadataDef;
    if (isPropertyMetadata(meta)) {
    }
    return meta;
  }

  visitAction(meta: MetadataDef<ActionOptions>, parent: any, context: any) {
    if (isMethodMetadata(meta)) {
      context.action = meta.propertyKey;
    }
    return meta;
  }

  visitParam(meta: MetadataDef<ParamOptions>, parent: any, context: any) {
    const options = meta.metadataDef;
    if (isPropertyMetadata(meta)) {
      let { name } = context;
      if (options.other) {
        name += ` [${options.name}...]`;
      } else {
        name += ` <${options.name}>`;
      }
      context.name = name;
    }
    return meta;
  }
}
