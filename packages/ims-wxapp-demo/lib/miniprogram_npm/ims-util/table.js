"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const lang_1 = require("./lang");
const ramda_1 = require("ramda");
class Table extends rxjs_1.Subject {
    constructor(name, opt, debug = false) {
        super();
        this.name = name;
        this.opt = opt;
        this.debug = debug;
        this._lastId = 0;
        this.data = new Map();
        this.cache = new Map();
        this.defaults = {};
        this.errors = [];
        this.columns = [];
        this.uniques = [];
        this.indices = [];
        this.columns = opt.columns || [];
        this.indices = opt.indices || [];
        this.uniques = opt.uniques || [];
        this.orderBy = opt.orderBy || '__id__ desc';
        const createId = () => ++this._lastId;
        this.createIdMethod = opt.createId || createId;
        this.indices.forEach(ind => {
            if (!this.columns.includes(ind)) {
                this.columns.push(ind);
            }
        });
        this.uniques.forEach(uniq => {
            if (lang_1.isString(uniq)) {
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
    getId(data) {
        return this.createIdMethod(data);
    }
    get objectId() {
        let id = lang_1.uuid4();
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
    addUniques(...uniques) {
        let added = [];
        for (let i = 0; i < uniques.length; i++) {
            let uniq = uniques[i];
            if (this.indices.includes(uniq)) {
                if (!this.uniques.includes(uniq)) {
                    this.uniques.push(uniq);
                    added.push(uniq);
                }
            }
        }
        added.forEach(add => this.data.forEach((data, key) => this.addIndex(add, data, key)));
    }
    addColumn(...columns) {
        this.columns.concat(...columns);
        this.data.forEach(data => columns.map(column => (data[column] = this.getDefaults(column))));
    }
    addIndices(...indices) {
        this.indices.concat(...indices);
        this.data.forEach((data, key) => {
            indices.map(indice => {
                if (!this.cache.has(indice))
                    this.cache.set(indice, new Map());
                this.addIndex(indice, data, key);
            });
        });
    }
    get result() {
        let values = [];
        this.data.forEach((v, key) => {
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
                if (order.toLowerCase() === 'desc') {
                    return b[key] - a[key];
                }
                else {
                    return a[key] - b[key];
                }
            };
        })
            .forEach(a => (values = values.sort(a)));
        return values;
    }
    insert(data) {
        data = this.getRowData(data);
        if (!this.checkUnique(data)) {
            const idx = this.getId(data);
            this.addData(idx, data);
            this.emit('insert');
        }
        else {
            return this.throwError(new Error(`insert fail`), this);
        }
        return this;
    }
    addData(id, data) {
        if (!lang_1.isNullOrUndefined(id)) {
            this.data.set(id, data);
            this.indices.map(key => this.addIndex(key, data, id));
        }
    }
    delete(id) {
        if (this.data.has(id)) {
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
    search(fn = (a, b) => true, table = this.copyObject()) {
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
    groupBy(fn) {
        return ramda_1.groupBy(fn, this.result);
    }
    and(...fns) {
        return this.search((a, b) => fns.every(fn => fn(a, b)));
    }
    or(...fns) {
        return this.search((a, b) => fns.some(fn => fn(a, b)));
    }
    update(id, data) {
        if (lang_1.isNullOrUndefined(id)) {
            return;
        }
        if (lang_1.isObject(id)) {
            let { __id__, ...item } = id;
            id = __id__;
            data = data || item;
        }
        data = this.getRowData(data);
        let unic = this.checkUnique(data);
        if (unic) {
            if (unic.has(id)) {
                if (this.data.has(id)) {
                    this.addData(id, data);
                    this.emit('update', data);
                }
            }
        }
        else {
            if (this.data.has(id)) {
                this.addData(id, data);
                this.emit('update', data);
            }
            else {
                this.addData(id, data);
                this.indices.map(key => this.addIndex(key, data, id));
            }
        }
        return data;
    }
    change(fn = (a, b) => true, types = ['delete', 'insert', 'update']) {
        return this.pipe(operators_1.map(res => res.type), operators_1.filter(type => types.includes(type)), operators_1.map(() => this.search(fn).result));
    }
    get(id) {
        if (this.data.has(id)) {
            return this.data.get(id);
        }
        return null;
    }
    has(id) {
        if (this.data.has(id))
            return true;
        return false;
    }
    export() {
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
    copyObject() {
        return new Table(this.name, this.opt, this.debug);
    }
    emit(type, data) {
        const errors = this.errors;
        this.next({ type, data, errors });
    }
    checkUnique(data) {
        let i = 0, len = this.uniques.length, uni;
        for (i; i < len; i++) {
            uni = this.uniques[i];
            let uniKey = this.getUniqKey(uni, data);
            let cache = this.cache.get(uniKey);
            if (cache) {
                if (cache.has(data[uni])) {
                    const set = cache.get(data[uni]);
                    if (set.size === 1) {
                        return set;
                    }
                    else if (set.size === 0) {
                        return false;
                    }
                    else {
                        return this.throwError(new Error(`unique fail`), false);
                    }
                }
            }
        }
        return false;
    }
    getUniqKey(indexName, data) {
        let idx = indexName.split('-');
        let indexValue;
        if (idx.length > 1) {
            indexValue = idx
                .map(id => id.split('.').reduce((acc, curr) => {
                return acc[curr];
            }, data))
                .join('-');
        }
        else if (idx.length === 1) {
            indexValue = data[indexName];
        }
        return indexValue;
    }
    addIndex(indexName, data, value) {
        const cache = this.cache.get(indexName);
        let indexValue = this.getUniqKey(indexName, data);
        if (!cache.has(indexValue)) {
            cache.set(indexValue, new Set([value]));
        }
        else {
            cache.get(indexValue).add(value);
        }
        return this;
    }
    getRowData(data) {
        let preInsert = {};
        this.columns.forEach(col => (preInsert[col] = lang_1.isNullOrUndefined(data[col])
            ? this.getDefaults(col)()
            : data[col]));
        return preInsert;
    }
    throwError(err, def) {
        if (this.debug) {
            throw err;
        }
        return def;
    }
    getDefaults(key) {
        let def = () => undefined;
        return this.defaults[key] || def;
    }
    static get uuid() {
        return lang_1.uuid4();
    }
    static create(json) {
        return this.of(json);
    }
    static of(json) {
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
exports.Table = Table;
