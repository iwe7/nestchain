import { Injectable, Res } from '@nestjs/common';
import { INSTALL_LOCK } from 'ims-const';
import { exists } from 'ims-fs';
import { Response } from 'express';

@Injectable()
export class ImsInstallService {
  async checkInstalled() {
    let isExist = await exists(INSTALL_LOCK);
    return !!isExist;
  }
}
