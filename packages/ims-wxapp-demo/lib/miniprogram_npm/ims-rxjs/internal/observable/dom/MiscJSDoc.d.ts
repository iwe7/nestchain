import { Subscriber } from '../../Subscriber';
import { AjaxResponse } from './AjaxObservable';
export declare class AjaxRequestDoc {
    url: string;
    body: any;
    user: string;
    async: boolean;
    method: string;
    headers: Object;
    timeout: number;
    password: string;
    hasContent: boolean;
    crossDomain: boolean;
    withCredentials: boolean;
    createXHR(): XMLHttpRequest;
    progressSubscriber: Subscriber<any>;
    resultSelector<T>(response: AjaxResponse): T;
    responseType: string;
}
