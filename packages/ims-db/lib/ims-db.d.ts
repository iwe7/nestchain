export declare class ImsDb {
    connect(address: string): void;
    as(item: {
        secret: string;
        address: string;
    }): void;
    use(address: string): void;
    setRestrict(restrict: boolean): void;
    submit(): void;
    generateAddress(): void;
    pay(accountId: string, count: number): void;
    createTable(): void;
    renameTable(): void;
    dropTable(): void;
    insert(): void;
    update(): void;
    delete(): void;
    get(): void;
    limit(): void;
    order(): void;
    withFields(): void;
    grant(): void;
    beginTran(): void;
    assert(): void;
    commit(): void;
    getLedger(): void;
    getLedgerVersion(): void;
    getTransactions(): void;
    getTransaction(): void;
    subscribeTable(): void;
    unsubcribeTable(): void;
    subscribeTx(): void;
    unsubscribeTx(): void;
}
