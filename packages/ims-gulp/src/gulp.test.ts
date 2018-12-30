import { gulp } from './index';
import path = require('path');
let res = gulp(path.join(__dirname, 'test'), path.join(__dirname, 'dist'));
res(false);
