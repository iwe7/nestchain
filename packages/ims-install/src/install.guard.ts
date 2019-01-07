import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ImsInstallService } from './install.service';
@Injectable()
export class InstallGuard implements CanActivate {
  constructor(public install: ImsInstallService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // let res = this.install.notExistInstallLock();
    // return res;
    return false;
  }
}
