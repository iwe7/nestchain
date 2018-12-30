import del = require('del');

export const clean = (src: string) => {
  let run = () => del(src);
  return {
    run,
  };
};
