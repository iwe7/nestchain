import { Get, Post, Put, Delete, Head, Options, Http } from './decorator';
import { injector } from './visitor';
import 'reflect-metadata';
@Http('/')
export class TestHttp {
  @Get()
  getIndex() {
    return 'index';
  }
}
injector(TestHttp);
