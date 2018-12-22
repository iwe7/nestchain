import {
  Visitor,
  MetadataDef,
  isClassMetadata,
  isPropertyMetadata,
  isMethodMetadata,
} from 'ims-decorator';
import {
  Server,
  ServerCredentials,
  loadPackageDefinition,
  credentials,
} from 'grpc';
import { loadSync } from '@grpc/proto-loader';
import { Type } from 'ims-core';
import { toLTitleCase } from 'ims-util';
import {
  GrpcServerOptions,
  GrpcRouterOptions,
  GrpcClientOptions,
} from './decorator';
export class GrpcVisitor extends Visitor {
  visitGrpcServer(
    it: MetadataDef<GrpcServerOptions>,
    parent: any,
    context: any,
    opts: any = {},
  ) {
    let options: GrpcServerOptions = { ...it.metadataDef, ...opts };
    let that = this;
    if (isClassMetadata(it)) {
      it.metadataFactory = function(Target: Type<any>) {
        return class extends Target {
          package: any = {};
          config = {};
          server: Server = new Server();
          constructor(...args: any[]) {
            super(...args);
            this.package = loadPackageDefinition(
              loadSync(options.fileName, options.options),
            );
            Object.keys(options.router).forEach(key => {
              let it = options.router[key];
              that.visitType(it, this.config, key);
            });
            Object.keys(this.package).forEach(key => {
              let cfg = this.config;
              let pkg = this.package[key];
              Object.keys(pkg).forEach(it => {
                this.server.addService(pkg[it].service, cfg[it]);
              });
            });
            this.server.bind(
              options.address,
              ServerCredentials.createInsecure(),
            );
            this.server.start();
          }
        };
      };
    }
    if (isPropertyMetadata(it)) {
    }
    if (isMethodMetadata(it)) {
    }
    return it;
  }

  visitGrpcClient(
    it: MetadataDef<GrpcClientOptions>,
    parent: any,
    context: any,
    opts: any = {},
  ) {
    let options: GrpcClientOptions = { ...it.metadataDef, ...opts };
    let that = this;
    if (isClassMetadata(it)) {
      it.metadataFactory = function(type: Type<any>) {
        return class extends type {
          package: any = {};
          instance: any = {};
          constructor(...args: any[]) {
            super(...args);
            this.package = loadPackageDefinition(
              loadSync(options.fileName, options.options),
            );
            that.visitTypeOther(type, parent, this);
          }
          get(name: string) {
            let [pkg, cls] = name.split('.');
            let method = this.package[pkg][cls];
            return new method(options.address, credentials.createInsecure());
          }
        };
      };
    }
    if (isPropertyMetadata(it)) {
      context[it.propertyKey] = context.get(`${options.path}`);
    }
    return it;
  }

  visitGrpcRouter(
    it: MetadataDef<GrpcRouterOptions>,
    parent: any,
    context: any,
    opts: any = {},
  ) {
    let options = { ...it.metadataDef, ...opts };
    let that = this;
    if (isClassMetadata(it)) {
      it.metadataFactory = function(type: Type<any>) {
        return class extends type {
          topPath: string;
          constructor(...args: any[]) {
            super(...args);
            this.topPath = options.path;
            that.visitTypeOther(type, parent, this);
          }
        };
      };
    }
    if (isMethodMetadata(it)) {
      if (!!context.topPath) {
        parent[context.topPath] = parent[context.topPath] || {};
        parent[context.topPath][toLTitleCase(options.path)] = context[
          it.propertyKey
        ].bind(context);
      } else {
        const [topPath, path] = options.path.split('.');
        if (!!path) {
          parent[topPath] = parent[topPath] || {};
          parent[topPath][toLTitleCase(path)] = context[it.propertyKey].bind(
            context,
          );
        }
      }
      return it;
    }
    return it;
  }
}
