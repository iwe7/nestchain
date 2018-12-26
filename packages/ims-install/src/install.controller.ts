import { Controller, Get, Res } from '@nestjs/common';

@Controller('/install')
export class ImsInstallController {
  constructor() {}
  @Get()
  async index() {
    return 'install';
  }
}
