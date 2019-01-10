import { MultiplexMuxer } from './multiplex/muxer';
export abstract class MplexFactory {
  abstract create(conn: any, isListener: boolean): MultiplexMuxer;
  abstract dialer(conn: any): MultiplexMuxer;
  abstract listener(conn: any): MultiplexMuxer;
}
