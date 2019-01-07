import fs = require('fs');
import path = require('path');
export default function listDirTask(
  dir: string,
): { name: string; path: string }[] {
  let files: { name: string; path: string }[] = [];
  fs.readdirSync(dir)
    .map(res => ({
      name: res,
      path: path.join(dir, res),
    }))
    .forEach(file => {
      let stat = fs.statSync(file.path);
      if (stat.isDirectory()) {
        files.push(file);
      }
    });
  return files;
}
