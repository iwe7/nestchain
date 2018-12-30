import del = require('del');
import { from } from 'rxjs';
import { tap } from 'rxjs/operators';

export const clean = (src: string) => {
  let run = from(del(src)).pipe(tap(() => console.log(`clean ${src}`)));
  return {
    run,
  };
};
