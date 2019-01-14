import os = require('os');
import { Injectable } from 'ims-core';
import { NgModule } from '@angular/core';
@Injectable()
export class ImsOs {
  getOs() {
    return {
      arch: os.arch(),
      cpus: os.cpus(),
      freemem: os.freemem(),
      hostname: os.hostname(),
      loadavg: os.loadavg(),
      networkInterfaces: os.networkInterfaces(),
      platform: os.platform(),
      release: os.release(),
      tmpdir: os.tmpdir(),
      totalmem: os.totalmem(),
      type: os.type(),
      uptime: os.uptime(),
      homedir: os.homedir(),
    };
  }
}

@NgModule({
  providers: [ImsOs],
})
export class OsModule {}
