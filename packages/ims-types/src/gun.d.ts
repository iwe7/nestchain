declare module 'gun' {
  namespace Gun {
    const serve: any;
    // todo
    function on(type: 'opt', fn: (root: any) => any): any;
  }
  export = Gun;
}
