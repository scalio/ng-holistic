import { isEmpty } from 'ramda';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
    IRepositoryStorage,
    MapResultToRequestFun,
    RepositoryLocalStorage,
    RepositorySessionStorage
} from './repository-storage';

export type LoadListFunc<TState, TResult> = (state: TState) => Observable<TResult>;

export interface ILoadListDecorator<TState, TResult> {
    reset(): void;
    decorate(fn: LoadListFunc<TState, TResult>): LoadListFunc<TState, TResult>;
}

/**
 * Determine if request is initial, i.e. first load on component initialization
 */
export type CheckInitRequestFun = (request: any) => boolean;

/**
 * Given stored request map it to one without page index.
 * Initial request must always load first page data.
 */
export type ResetPageIndexFun = (request: any) => any;

/**
 * When state is null or empty object, get latest state from storage and use one for request.
 * Optionally could use checkInitState - function which check if state is initial in which case
 * override initial state with stored one if it exists
 */

export class GetLoadListDecorator<TState, TResult> implements ILoadListDecorator<TState, TResult> {
    constructor(
        private readonly storage: IRepositoryStorage,
        private readonly resetPageIndex: ResetPageIndexFun,
        private readonly checkInitRequest?: CheckInitRequestFun
    ) {}
    decorate(fn: LoadListFunc<TState, TResult>): LoadListFunc<TState, TResult> {
        return request => {
            const storedRequest = this.storage.getRequest();
            let initialRequest: any;
            if (!request || isEmpty(request) || (this.checkInitRequest && this.checkInitRequest(request))) {
                if (storedRequest) {
                    initialRequest = storedRequest.request;
                    // lets reset pageIndex, initial request always should starts with 1st page
                    initialRequest = this.resetPageIndex(initialRequest);
                }
            }

            // use initial request instead of active request
            const indeedRequest = initialRequest || request;
            return fn(indeedRequest).pipe(tap(result => this.storage.setRequest(indeedRequest, null, result)));
        };
    }

    reset() {
        this.storage.reset();
    }
}

export class GetAllSessionStorageDecorator<TState = any, TResult = any> extends GetLoadListDecorator<TState, TResult> {
    constructor(name: string, resetPageIndex: ResetPageIndexFun, map?: MapResultToRequestFun, ttl?: number) {
        super(new RepositorySessionStorage(name, map, ttl), resetPageIndex);
    }
}

export class GetAllLocalStorageDecorator<TState = any, TResult = any> extends GetLoadListDecorator<TState, TResult> {
    constructor(
        name: string,
        resetPageIndex: ResetPageIndexFun,
        map?: MapResultToRequestFun,
        checkInitState?: CheckInitRequestFun,
        ttl?: number
    ) {
        super(new RepositoryLocalStorage(name, map, ttl), resetPageIndex, checkInitState);
    }
}
