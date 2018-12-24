import express = require('express');
import path = require('path');
import http = require('http');
import https = require('https');
import fs = require('fs');

let app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res, next) => {
  res.end('hello');
});
let httpServer = http.createServer(app);
httpServer.listen(80);

let res = fs.readdirSync(path.join(__dirname, 'cert'));
console.log(res);
let stat = fs.statSync(path.join(__dirname, 'cert/privkey.pem'));
console.log(stat);

try {
  let key = fs.readFileSync(path.join(__dirname, 'cert/privkey.pem'));
  console.log(key);
  let cert = fs.readFileSync(path.join(__dirname, 'cert/cert.pem'));
  let httpsServer = https.createServer(
    {
      key,
      cert,
      requestCert: false,
      rejectUnauthorized: false,
    },
    app,
  );
  httpsServer.listen(443, '0.0.0.0', () => {
    console.log('https start');
  });
} catch (e) {}
