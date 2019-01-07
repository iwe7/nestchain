import { gulp } from './_gulp';
import { join } from 'path';
import { ROOT } from 'ims-const';
export const gulpPackages = () => {
  return gulp(join(ROOT, 'packages'), join(ROOT, 'publish'))(false).subscribe(
    res => {
      console.log('finish');
    },
  );
  // let files = listDirTask(src);
  // let obs = [];
  // files.map(file => {
  //   if (file.path) {
  //     obs.push(gulp(join(file.path, 'src'), join(file.path, 'lib'))(false));
  //   }
  // });
  // return forkJoin(...obs);
};
