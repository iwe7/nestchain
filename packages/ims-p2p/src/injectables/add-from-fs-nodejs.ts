const promisify = require('promisify-es6');
const pull = require('pull-stream');
import { Injectable } from 'ims-core';
import globSource from '../utils/glob-source';
@Injectable({
  providedIn: 'root',
})
export class AddFromFsNodejs {
  create(self: { addPullStream: any }) {
    return promisify((...args) => {
      const callback = args.pop();
      const options =
        typeof args[args.length - 1] === 'string' ? {} : args.pop();
      const paths = args;
      pull(
        globSource(...paths, options),
        self.addPullStream(options),
        pull.collect(callback),
      );
    });
  }
}
