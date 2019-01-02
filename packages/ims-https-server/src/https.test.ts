import { ImsHttpsServer } from 'ims-https-server';
import { readFileSync } from 'fs';
import { join } from 'path';
new ImsHttpsServer({
  host: '127.0.0.1',
  port: 3003,
  key: readFileSync(join(__dirname, 'test/private.pem'), 'utf8'),
  cert: readFileSync(join(__dirname, 'test/cert.pem'), 'utf8'),
  rejectUnauthorized: false,
});
