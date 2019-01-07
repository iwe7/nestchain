import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { WEB_TEMPLATE_INDEX_PATH } from 'ims-const';
import { ImsOs } from 'ims-os';
import { InstallGuard } from './install.guard';

@Controller('/install')
@UseGuards(InstallGuard)
export class ImsInstallController {
  constructor(public os: ImsOs) {}
  @Get()
  async index(@Res() res: Response) {
    // let content = await readFile(WEB_TEMPLATE_INDEX_PATH);
    res.type('.html');
    res.set('Accept', 'text/plain');
    // res.end(content);
  }
  @Get('getOs')
  async getOs() {
    return this.os.getOs();
  }
}
