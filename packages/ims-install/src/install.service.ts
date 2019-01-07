import { Injectable, Res } from '@nestjs/common';
import { INSTALL_LOCK } from 'ims-const';
// import { exists } from 'ims-fs';

@Injectable()
export class ImsInstallService {
  async notExistInstallLock() {
    // let res = await exists(INSTALL_LOCK);
    // return !res;
    return false;
  }
}
