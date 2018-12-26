import { Module } from '@nestjs/common';
import { ImsInstallController } from './install.controller';
import { ImsInstallService } from './install.service';
import { ImsOs } from 'ims-os';
import { InstallGuard } from './install.guard';
@Module({
  controllers: [ImsInstallController],
  providers: [ImsInstallService, ImsOs, InstallGuard],
  exports: [ImsInstallService],
})
export class ImsInstallModule {}
