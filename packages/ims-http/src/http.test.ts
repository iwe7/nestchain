import {
  Get,
  Post,
  Put,
  Delete,
  Head,
  Options,
  Router,
  Server,
  ServerFactory,
  Req,
  ReqToken,
} from './decorator';
import 'reflect-metadata';
import { Request } from 'express';
import { inject } from 'ims-injector';
@Router('/')
export class TestHttp {
  @Get()
  getIndex(@Req() req: Request) {
    let _req = inject(ReqToken);
    debugger;
  }
}

@Server({
  port: 8089,
  routes: [TestHttp],
})
export class TestServer {}
let res = ServerFactory.create(TestServer);
