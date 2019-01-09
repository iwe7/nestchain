import { SubscriptionLike, TeardownLogic } from './types';
export declare class Subscription implements SubscriptionLike {
    static EMPTY: Subscription;
    closed: boolean;
    protected _parent: Subscription;
    protected _parents: Subscription[];
    private _subscriptions;
    constructor(unsubscribe?: () => void);
    unsubscribe(): void;
    add(teardown: TeardownLogic): Subscription;
    remove(subscription: Subscription): void;
    private _addParent;
}
