import { Get, Post, Put, Delete, Head, Options, Http } from './decorator';
import { injector } from './visitor';
import 'reflect-metadata';
@Http({
  host: '127.0.0.1',
  port: 8088,
})
export class TestHttp {
  @Get({
    path: '/',
  })
  getIndex() {
    return 'index';
  }
}
injector(TestHttp).subscribe(res => {
  console.log(res);
});
