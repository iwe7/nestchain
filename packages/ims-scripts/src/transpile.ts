import path = require('path');
import cp = require('child_process');
export function transpile(tsConfigPath: string) {
  tsConfigPath = path.resolve(__dirname, tsConfigPath);
  try {
    var cmd = 'npx tsc -p ' + tsConfigPath;
    cp.execSync(cmd, { cwd: __dirname }).toString();
    return true;
  } catch (e) {
    console.log(e.stdout.toString());
    return false;
  }
}
