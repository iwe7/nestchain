import { gulp } from './index';
import path = require('path');
gulp(path.join(__dirname, 'test'), path.join(__dirname, 'dist'))(
  false,
).subscribe(res => console.log(res));
