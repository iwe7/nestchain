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
    let hasInstalled = await this.install.checkInstalled();
    if (!hasInstalled) {
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

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.useStaticAssets(PUBLIC_PATH);
  await app.listen(3000);
}
bootstrap();
