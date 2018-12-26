import { Module } from '@nestjs/common';
import { ImsInstallController } from './install.controller';
import { ImsInstallService } from './install.service';

@Module({
  controllers: [ImsInstallController],
  providers: [ImsInstallService],
  exports: [ImsInstallService],
})
export class ImsInstallModule {}
