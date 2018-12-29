import cp = require('child_process');
export function clone(gitUrl: string) {
  try {
    const res = cp.spawn('git', ['clone', gitUrl], {
      cwd: __dirname,
      stdio: 'pipe',
    });
    res.stdio[0].on('data', data => {
      console.log(data.toString());
    });
    res.stdio[1].on('data', data => {
      console.log(data.toString());
    });
    res.stdio[2].on('data', data => {
      console.log(data.toString());
    });
    return true;
  } catch (e) {
    console.log(e.message);
    return false;
  }
}
