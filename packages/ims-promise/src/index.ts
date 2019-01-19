export function fromErrorCallback<T = any>(fn: Function) {
  return (...args: any[]) =>
    new Promise((resolve, reject) => {
      fn(...args, (err, data: T) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
}

export function fromSuccessFailCallback<T>(fn: Function) {
  return (...args: any[]) =>
    new Promise((resolve, reject) => {
      fn(
        ...args,
        (data: T) => {
          resolve(data);
        },
        (err: Error) => {
          reject(err);
        },
      );
    });
}

export function fromFailSuccessCallback<T>(fn: Function) {
  return (...args: any[]) =>
    new Promise((resolve, reject) => {
      fn(
        ...args,
        (err: Error) => {
          reject(err);
        },
        (data: T) => {
          resolve(data);
        },
      );
    });
}
