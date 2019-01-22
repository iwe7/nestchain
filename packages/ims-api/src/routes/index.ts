import { Router, Get } from '../decorator';

@Router({})
export class IndexRouter {
  @Get()
  async index() {
    return 'hello';
  }
}
