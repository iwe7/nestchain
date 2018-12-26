import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { readFile } from 'ims-fs';
import { WEB_TEMPLATE_INDEX_PATH } from 'ims-const';
@Controller('/install')
export class ImsInstallController {
  constructor() {}
  @Get()
  async index(@Res() res: Response) {
    let content = await readFile(WEB_TEMPLATE_INDEX_PATH);
    res.type('.html');
    res.set('Accept', 'text/plain');
    res.end(content);
  }
}
