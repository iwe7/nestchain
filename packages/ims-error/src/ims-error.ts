export class ImsError extends Error {
  constructor(msg: string, public code?: string, props?: any) {
    super(msg);
    if (props) {
      for (let key in props) {
        this[key] = props[key];
      }
    }
  }
}
