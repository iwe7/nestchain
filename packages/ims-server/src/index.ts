import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { Module, Controller, Get, Res } from '@nestjs/common';
import { ImsInstallModule, ImsInstallService } from 'ims-install';
import { Response } from 'express';
import { PUBLIC_PATH } from 'ims-const';
@Controller()
export class IndexController {
  constructor(private install: ImsInstallService) {}
  @Get()
  async index(@Res() res: Response) {
    let existInstallLock = await this.install.notExistInstallLock();
    if (existInstallLock) {
      res.redirect('/install');
      return;
    }
    return 'welcome to index';
  }
}

@Module({
  controllers: [IndexController],
  imports: [ImsInstallModule],
})
export class ApplicationModule {}

export async function bootstrap(port: number) {
  const app = await NestFactory.create(ApplicationModule);
  app.useStaticAssets(PUBLIC_PATH);
  await app.listen(port);
}
