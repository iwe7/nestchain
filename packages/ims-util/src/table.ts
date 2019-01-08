import { Subject, Observable } from 'ims-rxjs';
import { filter, map } from 'ims-rxjs/operators';
import { isObject, isString, uuid4, isNullOrUndefined } from './lang';
import { groupBy } from 'ramda';
export type TableName = string;
export type ColumnName = string;
export type ColumnValue = string | number | any;
export type TableDataUniqueIndex = string | number;
export interface ComposeFunc {
  (name: ColumnName, value: ColumnValue): boolean;
}
export interface TableWhere {
  (name, value): boolean;
}
export type TableEventType =
  | 'init'
  | 'insert'
  | 'update'
  | 'indexed'
  | 'delete';
export interface TableEvent {
  type: TableEventType;
  data: any;
  errors: Error[];
}
export class Table<T = any> extends Subject<TableEvent> {
  // 上一次位置
  _lastId: number = 0;
  // 数据存储
  data: Map<TableDataUniqueIndex, T> = new Map();
  // 数据查询
  private cache: Map<
    ColumnName,
    Map<ColumnValue, Set<TableDataUniqueIndex>>
  > = new Map();
  // todo 自增唯一索引,可优化其他方案
  private createIdMethod: any;
  getId(data: T) {
    return this.createIdMethod(data);
  }
  // todo 唯一索引,可优化其他方案,objectId
  get objectId() {
    let id = uuid4();
    if (this.has(id)) {
      return this.objectId;
    }
    return id;
  }

  get size() {
    return this.data.size;
  }

  get total() {
    return this.size;
  }

  // todo 默认值
  private defaults: { [key: string]: () => string } = {};
  // todo
  private errors: Error[] = [];
  // 表列
  private columns: string[] = [];
  // 唯一约束
  private uniques: string[] = [];
  // 索引;
  private indices: string[] = [];

  orderBy: string;
  constructor(
    public name: string,
    private opt: {
      columns: string[];
      indices: string[];
      uniques: string[];
      createId?: any;
      orderBy?: any;
    },
    private debug: boolean = false,
  ) {
    super();
    this.columns = opt.columns || [];
    this.indices = opt.indices || [];
    this.uniques = opt.uniques || [];
    this.orderBy = opt.orderBy || '__id__ desc';
    // 默认自增序列
    const createId = () => ++this._lastId;
    this.createIdMethod = opt.createId || createId;
    this.indices.forEach(ind => {
      if (!this.columns.includes(ind)) {
        this.columns.push(ind);
      }
    });
    this.uniques.forEach(uniq => {
      if (isString(uniq)) {
        if (!this.indices.includes(uniq)) {
          this.indices.push(uniq);
        }
      }
    });
    this.indices.map(indexName => {
      const map = new Map();
      this.cache.set(indexName, map);
    });
  }
  // 添加唯一索引
  addUniques(...uniques: string[]) {
    let added: string[] = [];
    for (let i = 0; i < uniques.length; i++) {
      let uniq = uniques[i];
      if (this.indices.includes(uniq)) {
        if (!this.uniques.includes(uniq)) {
          this.uniques.push(uniq);
          added.push(uniq);
        }
      }
    }
    added.forEach(add =>
      this.data.forEach((data, key) => this.addIndex(add, data, key)),
    );
  }
  // 添加列
  addColumn(...columns: string[]) {
    this.columns.concat(...columns);
    this.data.forEach(data =>
      columns.map(column => (data[column] = this.getDefaults(column))),
    );
  }
  // 添加索引
  addIndices(...indices: string[]) {
    this.indices.concat(...indices);
    this.data.forEach((data, key) => {
      indices.map(indice => {
        if (!this.cache.has(indice)) this.cache.set(indice, new Map());
        this.addIndex(indice, data, key);
      });
    });
  }
  // 获取数据
  get result(): T[] {
    let values: T[] = [];
    this.data.forEach((v: any, key) => {
      let data = v;
      data['__id__'] = key;
      values.push(data);
    });
    this.orderBy
      .split(',')
      .map(order => order.split(' '))
      .map(orders => {
        let [key, order] = orders;
        return (a, b) => {
          if ((order as string).toLowerCase() === 'desc') {
            return b[key] - a[key];
          } else {
            return a[key] - b[key];
          }
        };
      })
      .forEach(a => (values = values.sort(a)));
    return values;
  }
  // 增
  insert(data: T): Table {
    data = this.getRowData(data);
    if (!this.checkUnique(data)) {
      const idx = this.getId(data);
      this.addData(idx, data);
      this.emit('insert');
    } else {
      return this.throwError(new Error(`insert fail`), this);
    }
    return this;
  }
  private addData(id, data) {
    if (!isNullOrUndefined(id)) {
      this.data.set(id, data);
      this.indices.map(key => this.addIndex(key, data, id));
    }
  }
  // 删
  delete(id: TableDataUniqueIndex): Table {
    if (this.data.has(id)) {
      // 删除相关外链
      this.cache.forEach((map, name) => {
        map.forEach((set, val) => {
          if (set.has(id)) {
            set.delete(id);
          }
        });
      });
      this.emit('delete', id);
    }
    return this;
  }
  // 查
  search(
    fn: (name, value) => boolean = (a, b) => true,
    table: Table = this.copyObject(),
  ): Table {
    this.cache.forEach((cache, columnName) => {
      cache.forEach((set, columnValue) => {
        let res = fn(columnName, columnValue);
        if (res) {
          set.forEach(v => {
            if (this.has(v)) {
              let data = this.get(v);
              table.insert(data);
            }
          });
        }
      });
    });
    return table;
  }

  groupBy(fn: (item: T) => string): { [key: string]: T[] } {
    return groupBy(fn, this.result);
  }

  and(...fns: TableWhere[]): Table {
    return this.search((a, b) => fns.every(fn => fn(a, b)));
  }

  or(...fns: TableWhere[]): Table {
    return this.search((a, b) => fns.some(fn => fn(a, b)));
  }

  // 改
  update(id: TableDataUniqueIndex | any, data?: T): T {
    if (isNullOrUndefined(id)) {
      return;
    }
    if (isObject(id)) {
      let { __id__, ...item } = id as any;
      id = __id__;
      data = data || item;
    }
    data = this.getRowData(data);
    let unic = this.checkUnique(data);
    // 是否满足唯一约束
    if (unic) {
      // 满足
      if (unic.has(id)) {
        if (this.data.has(id)) {
          this.addData(id, data);
          this.emit('update', data);
        }
      }
    } else {
      // 满足唯一
      if (this.data.has(id)) {
        this.addData(id, data);
        this.emit('update', data);
      } else {
        // 插入
        this.addData(id, data);
        this.indices.map(key => this.addIndex(key, data, id));
      }
    }
    return data;
  }
  // 变更
  change(
    fn: (name, value) => boolean = (a, b) => true,
    types: TableEventType[] = ['delete', 'insert', 'update'],
  ): Observable<T[]> {
    return this.pipe(
      map(res => res.type),
      filter(type => types.includes(type)),
      map(() => this.search(fn).result),
    );
  }

  // 获取结果
  get(id: TableDataUniqueIndex): T {
    if (this.data.has(id)) {
      return this.data.get(id);
    }
    return null;
  }
  // 是否有数据
  has(id: TableDataUniqueIndex): boolean {
    if (this.data.has(id)) return true;
    return false;
  }
  // 导出
  export(): {
    name: string;
    columns: string[];
    indices: string[];
    uniques: string[];
    data: Array<[TableDataUniqueIndex, T]>;
  } {
    const data = [];
    this.data.forEach((v, k) => data.push([k, v]));
    return {
      name: this.name,
      columns: this.columns,
      indices: this.indices,
      uniques: this.uniques,
      data,
    };
  }
  // 拷贝
  copy() {
    let parent = new Table(this.name, this.opt, this.debug);
    parent.data = new Map(this.data.entries());
    parent.cache = new Map();
    this.cache.forEach((v, key) => {
      let map = new Map();
      v.forEach((item, value) => {
        map.set(value, new Set(item));
      });
      parent.cache.set(key, map);
    });
    return parent;
  }

  private copyObject(): Table {
    return new Table(this.name, this.opt, this.debug);
  }

  private emit(type: TableEventType, data?: any) {
    const errors = this.errors;
    this.next({ type, data, errors });
  }
  // 检查唯一
  private checkUnique(data: T): false | Set<TableDataUniqueIndex> {
    let i = 0,
      len = this.uniques.length,
      uni: string;
    for (i; i < len; i++) {
      uni = this.uniques[i];
      let uniKey = this.getUniqKey(uni, data);
      let cache = this.cache.get(uniKey);
      if (cache) {
        if (cache.has(data[uni])) {
          const set = cache.get(data[uni]);
          if (set.size === 1) {
            return set;
          } else if (set.size === 0) {
            return false;
          } else {
            // 修复
            return this.throwError(new Error(`unique fail`), false);
          }
        }
      }
    }
    return false;
  }

  private getUniqKey(indexName: string, data: any) {
    let idx = indexName.split('-');
    let indexValue;
    if (idx.length > 1) {
      indexValue = idx
        .map(id =>
          id.split('.').reduce((acc, curr) => {
            return acc[curr];
          }, data),
        )
        .join('-');
    } else if (idx.length === 1) {
      indexValue = data[indexName];
    }
    return indexValue;
  }

  private addIndex(indexName: string, data: T, value: TableDataUniqueIndex) {
    const cache = this.cache.get(indexName);
    let indexValue = this.getUniqKey(indexName, data);
    if (!cache.has(indexValue)) {
      cache.set(indexValue, new Set([value]));
    } else {
      cache.get(indexValue).add(value);
    }
    return this;
  }

  private getRowData(data: any) {
    let preInsert: any = {};
    this.columns.forEach(
      col =>
        (preInsert[col] = isNullOrUndefined(data[col])
          ? this.getDefaults(col)()
          : data[col]),
    );
    return preInsert;
  }

  private throwError<A = any>(err: Error, def: A): A {
    if (this.debug) {
      throw err;
    }
    return def;
  }

  private getDefaults(key: string) {
    let def = () => undefined;
    return this.defaults[key] || def;
  }

  static get uuid() {
    return uuid4();
  }

  static create<T = any>(json: {
    name: string;
    columns: string[];
    indices: string[];
    uniques: string[];
    data: Array<[TableDataUniqueIndex, T]>;
    indicesData: Array<
      [ColumnName, Array<[ColumnValue, TableDataUniqueIndex[]]>]
    >;
  }): Table<T> {
    return this.of(json);
  }

  static of<T = any>(json: {
    name: string;
    columns: string[];
    indices: string[];
    uniques: string[];
    data: Array<[TableDataUniqueIndex, T]>;
    indicesData: Array<
      [ColumnName, Array<[ColumnValue, TableDataUniqueIndex[]]>]
    >;
  }): Table<T> {
    const table = new Table(json.name, {
      columns: json.columns,
      indices: json.indices,
      uniques: json.uniques,
    });
    table.data = new Map(json.data);
    table._lastId = table.data.size;
    json.indicesData.forEach(([name, item]) => {
      let map = new Map();
      item.map(([val, data]) => {
        map.set(val, new Set(data));
      });
      table.cache.set(name, map);
    });
    return table;
  }
}
