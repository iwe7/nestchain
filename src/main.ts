import express = require('express');
import path = require('path');
let app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
  res.end('hello');
});
app.listen(99);
