import { scss, ts, image, copy, clean } from './tasks';

export const gulp = (src: string, dest: string) => {
  return (watch: boolean) => {
    clean(dest + '/**/*').run();
    if (watch) {
      scss(src + '/**/*.scss', dest).watch();
      ts(src + '/**/*.{ts,tsx}', dest).watch();
      image(src + '/**/*.{png,svg,gif,jpg,jpeg}', dest).watch();
      copy(src + '/**/*.{json,html,xml,md,yml,log}', dest).watch();
    } else {
      scss(src + '/**/*.scss', dest).run();
      ts(src + '/**/*.{ts,tsx}', dest).run();
      image(src + '/**/*.{png,svg,gif,jpg,jpeg}', dest).run();
      copy(src + '/**/*.{json,html,xml,md,yml,log}', dest).run();
    }
  };
};

export default gulp;
