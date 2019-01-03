import { ImsP2pServer } from './index';
import 'reflect-metadata';
const p2p = new ImsP2pServer();
import { injector } from './visitor';
import { Http, Get } from 'ims-http';

@Http('/')
export class TestHttp {
  @Get()
  getIndexPage() {
    return 'indexPage';
  }
}

let inst = injector(TestHttp).instance;
debugger;
