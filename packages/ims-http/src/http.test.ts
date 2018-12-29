import { Get, Post, Put, Delete, Head, Options, Http } from './decorator';
import { injector } from './visitor';

@Http({
  address: '/ip4/127.0.0.1/http/80',
})
export class TestHttp {}
