import { createServer as httpCreateServer } from 'http';
import { createServer as httpsCreateServer } from 'https';
import socket = require('socket.io');

export default (app: any, key: string, cert: string) => {
  let server = httpCreateServer(app);
  let io = socket(server);
  // https
  let ciphers =
    'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:DHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA256:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA';
  let https = httpsCreateServer(
    {
      key,
      cert,
      ciphers,
    },
    app,
  );
  let httpsIo = socket(https);
  return {
    server,
    io,
    https,
    httpsIo,
  };
};
