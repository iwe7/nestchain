import { Subject, Observable } from 'rxjs';
export declare type TableName = string;
export declare type ColumnName = string;
export declare type ColumnValue = string | number | any;
export declare type TableDataUniqueIndex = string | number;
export interface ComposeFunc {
    (name: ColumnName, value: ColumnValue): boolean;
}
export interface TableWhere {
    (name: any, value: any): boolean;
}
export declare type TableEventType = 'init' | 'insert' | 'update' | 'indexed' | 'delete';
export interface TableEvent {
    type: TableEventType;
    data: any;
    errors: Error[];
}
export declare class Table<T = any> extends Subject<TableEvent> {
    name: string;
    private opt;
    private debug;
    _lastId: number;
    data: Map<TableDataUniqueIndex, T>;
    private cache;
    private createIdMethod;
    getId(data: T): any;
    readonly objectId: any;
    readonly size: number;
    readonly total: number;
    private defaults;
    private errors;
    private columns;
    private uniques;
    private indices;
    orderBy: string;
    constructor(name: string, opt: {
        columns: string[];
        indices: string[];
        uniques: string[];
        createId?: any;
        orderBy?: any;
    }, debug?: boolean);
    addUniques(...uniques: string[]): void;
    addColumn(...columns: string[]): void;
    addIndices(...indices: string[]): void;
    readonly result: T[];
    insert(data: T): Table;
    private addData;
    delete(id: TableDataUniqueIndex): Table;
    search(fn?: (name: any, value: any) => boolean, table?: Table): Table;
    groupBy(fn: (item: T) => string): {
        [key: string]: T[];
    };
    and(...fns: TableWhere[]): Table;
    or(...fns: TableWhere[]): Table;
    update(id: TableDataUniqueIndex | any, data?: T): T;
    change(fn?: (name: any, value: any) => boolean, types?: TableEventType[]): Observable<T[]>;
    get(id: TableDataUniqueIndex): T;
    has(id: TableDataUniqueIndex): boolean;
    export(): {
        name: string;
        columns: string[];
        indices: string[];
        uniques: string[];
        data: Array<[TableDataUniqueIndex, T]>;
    };
    copy(): Table<any>;
    private copyObject;
    private emit;
    private checkUnique;
    private getUniqKey;
    private addIndex;
    private getRowData;
    private throwError;
    private getDefaults;
    static readonly uuid: string;
    static create<T = any>(json: {
        name: string;
        columns: string[];
        indices: string[];
        uniques: string[];
        data: Array<[TableDataUniqueIndex, T]>;
        indicesData: Array<[ColumnName, Array<[ColumnValue, TableDataUniqueIndex[]]>]>;
    }): Table<T>;
    static of<T = any>(json: {
        name: string;
        columns: string[];
        indices: string[];
        uniques: string[];
        data: Array<[TableDataUniqueIndex, T]>;
        indicesData: Array<[ColumnName, Array<[ColumnValue, TableDataUniqueIndex[]]>]>;
    }): Table<T>;
}
