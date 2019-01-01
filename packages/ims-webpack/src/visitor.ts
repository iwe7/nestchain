import {
  injector2 as imsInjector,
  MetadataDef,
  isClassMetadata,
  Visitor2,
} from 'ims-decorator';
import { WebpackOptions } from './decorator';
import webpack = require('webpack');
import { Type } from 'ims-core';
export class ImsWebpackVisitor extends Visitor2 {
  visitWebpack(meta: MetadataDef<WebpackOptions>, parent: any, context: any) {
    const options = meta.metadataDef;
    if (isClassMetadata(meta)) {
      meta.metadataFactory = function(type: Type<any>) {
        return class extends type {};
      };
    }
    return meta;
  }
}

export const injector = imsInjector(new ImsWebpackVisitor());
