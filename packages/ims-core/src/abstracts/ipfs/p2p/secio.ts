import { Connection } from './connection';

export abstract class Secio {
  abstract encrypt(localId: any, conn: any, remoteId: any): Promise<Connection>;
}
