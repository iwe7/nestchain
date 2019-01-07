declare module 'class-is' {
  import { Type } from 'ims-core';
  interface IWithIs {
    className: string;
    symbolName: string;
  }
  interface IWithIsProto extends IWithIs {
    withoutNew: boolean;
  }
  function withIs<T, V, U>(Class: Type<T>, opt: IWithIs): Type<T & V> & U;
  namespace withIs {
    function proto<T, V, U>(
      Class: Function,
      opt: IWithIsProto,
    ): Type<T & V> & U;
  }
  export = withIs;
}
