import {
  MongoClient,
  MongoClientOptions,
  MongoClientCommonOption,
  Db,
  SessionOptions,
  ClientSession,
  ChangeStreamOptions,
  Timestamp,
  ChangeStream,
} from 'mongodb';

export class ImsMongoClient {
  constructor(public client: MongoClient) {}

  connect(): Promise<MongoClient> {
    return this.client.connect();
  }
  close(force?: boolean): Promise<void> {
    return this.client.close(force);
  }
  db(dbName?: string, options?: MongoClientCommonOption): Db {
    return this.client.db(dbName, options);
  }
  isConnected(options?: MongoClientCommonOption): boolean {
    return this.client.isConnected(options);
  }
  logout(options?: { dbName?: string }): Promise<any> {
    return this.client.logout(options);
  }
  startSession(options?: SessionOptions): ClientSession {
    return this.client.startSession(options);
  }
  watch(
    pipeline?: Object[],
    options?: ChangeStreamOptions & {
      startAtClusterTime?: Timestamp;
      session?: ClientSession;
    },
  ): ChangeStream {
    return this.client.watch(pipeline, options);
  }
  withSession(
    operation: (session: ClientSession) => Promise<any>,
  ): Promise<void> {
    return this.client.withSession(operation);
  }
}

import { NgModule, Injectable } from 'ims-core';

@Injectable()
export class ImsMongoFactory {
  async connect(
    uri: string,
    options?: MongoClientOptions,
  ): Promise<ImsMongoClient> {
    let client = await MongoClient.connect(
      uri,
      options,
    );
    return new ImsMongoClient(client);
  }
}

@NgModule({
  providers: [ImsMongoFactory],
})
export class ImsMongoModule {}
