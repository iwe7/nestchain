import { load, Options } from '@grpc/proto-loader';
import grpcLibrary = require('grpc');
import {
  GrpcObject,
  Server,
  ServerCredentials,
  loadPackageDefinition,
  credentials,
  Client,
} from 'grpc';
import { NgModule, Injectable, Type, Injector, InjectionToken } from 'ims-core';
export const GrpcServerConfig = new InjectionToken<{
  host: string;
  port: number;
}>('grpc server config');
export const GrpcClientConfig = new InjectionToken<{
  host: string;
  port: number;
}>('grpc client config');
export class ImsGrpc {
  server: Server;
  constructor(
    public packages: GrpcObject,
    public services: Type<any>[],
    public injector: Injector,
  ) {
    try {
      this.server = new Server();
      Object.keys(this.packages).forEach(key => {
        let pkg = this.packages[key];
        Object.keys(pkg).forEach(sKey => {
          let type = this.services.find(sType => sType.name === sKey);
          if (type) {
            let instance = this.injector.get(type);
            let service = pkg[sKey].service;
            let ins = {};
            Object.keys(service).forEach(s => {
              ins[s] = (res, call) => call(null, instance[s](res.request));
            });
            this.server.addService(service, ins);
          } else {
            throw new Error(`can not find ${sKey} services`);
          }
        });
      });
      let config = this.injector.get<{ host: string; port: number }>(
        GrpcServerConfig,
        {
          host: '127.0.0.1',
          port: 3001,
        },
      );
      this.server.bind(
        `${config.host}:${config.port}`,
        ServerCredentials.createInsecure(),
      );
      this.server.start();
    } catch (e) {
      debugger;
    }
  }
}

@Injectable()
export class ImsGrpcServerFactory {
  constructor(public injector: Injector) {}
  async create(
    filename: string,
    types: Type<any>[],
    options?: Options,
  ): Promise<ImsGrpc> {
    let packageDefinition = await load(filename, options);
    const packageObject = grpcLibrary.loadPackageDefinition(packageDefinition);
    return new ImsGrpc(packageObject, types, this.injector);
  }
}

@Injectable()
export class ImsGrpcClientFactory {
  client: { [key: string]: Client } = {};
  constructor(public injector: Injector) {}
  async create(
    filename: string,
    options?: Options,
  ): Promise<{ [key: string]: Client }> {
    try {
      let packages = await load(filename, options);
      let def = loadPackageDefinition(packages);
      Object.keys(def).forEach(key => {
        let pkgs = def[key];
        let clientConfig = this.injector.get<{ host: string; port: number }>(
          GrpcClientConfig,
          {
            host: '127.0.0.1',
            port: 3001,
          },
        );
        Object.keys(pkgs).forEach(nPkg => {
          let client = pkgs[nPkg];
          this.client[nPkg] = new client(
            `${clientConfig.host}:${clientConfig.port}`,
            credentials.createInsecure(),
          );
        });
      });
      return this.client;
    } catch (e) {
      console.error(e);
    }
  }
}

@NgModule({
  providers: [
    {
      provide: ImsGrpcServerFactory,
      useFactory: (injector: Injector) => new ImsGrpcServerFactory(injector),
      deps: [Injector],
    },
    {
      provide: ImsGrpcClientFactory,
      useFactory: (injector: Injector) => new ImsGrpcClientFactory(injector),
      deps: [Injector],
    },
  ],
})
export class ImsGrpcModule {}
