import { Connection } from './connection';
import { Listen } from './listen';

@Listen({
  host: '127.0.0.1',
  port: 3000,
  path: '/test',
})
export class TestListen {}

@Connection({
  host: '127.0.0.1',
  port: 3000,
  path: '/test',
})
export class TestConnection {}
