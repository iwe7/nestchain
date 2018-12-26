import level = require('level');

export class ImsLevel {
  db: any;

  constructor(path: string) {
    this.db = level(path);
  }

  del(...args: any[]) {
    return this.db.del(...args);
  }

  open(...args: any[]) {
    return this.db.open(...args);
  }

  close(...args: any[]) {
    return this.db.close(...args);
  }

  put(...args: any[]) {
    return this.db.put(...args);
  }

  get(...args: any[]) {
    return this.db.get(...args);
  }

  batch(...args: any[]) {
    return this.db.batch(...args);
  }

  isOpen(...args: any[]) {
    return this.db.isOpen(...args);
  }

  isClose(...args: any[]) {
    return this.db.isClose(...args);
  }

  createReadStream(...args: any[]) {
    return this.db.createReadStream(...args);
  }

  createKeyStream(...args: any[]) {
    return this.db.createKeyStream(...args);
  }

  createValueStream(...args: any[]) {
    return this.db.createValueStream(...args);
  }

  on(...args: any[]) {
    return this.db.createValueStream(...args);
  }
}
