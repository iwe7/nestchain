import os = require('os');
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
      homedir: os.homedir()
    };
  }
}
