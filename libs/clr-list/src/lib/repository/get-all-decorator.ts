import { isEmpty } from 'ramda';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IValueStorage, ValueLocalStorage, ValueSessionStorage } from './value-storage';

export type GetAllFunc<TState, TResult> = (state: TState) => Observable<TResult>;

export interface IGetAllDecorator<TState, TResult> {
    reset(): void;
    decorate(fn: GetAllFunc<TState, TResult>): GetAllFunc<TState, TResult>;
}

export interface IRepositoryStorage {
    getRequest(): { request: any; meta: any };
    setRequest(request: any, meta: any, response: any): void;
    reset(): void;
}

/**
 * Determine if request is initial, i.e. first load on component initialization
 */
export type CheckInitRequestFun = (request: any) => boolean;

/**
 * When state is null or empty object, get latest state from storage and use one for request.
 * Optionally could use checkInitState - function which check if state is initial in which case
 * override initial state with stored one if it exists
 */

export class GetAllDecorator<TState, TResult> implements IGetAllDecorator<TState, TResult> {
    constructor(
        private readonly storage: IRepositoryStorage,
        private readonly checkInitRequest?: CheckInitRequestFun
    ) {}
    decorate(fn: GetAllFunc<TState, TResult>): GetAllFunc<TState, TResult> {
        return request => {
            const storedRequest = this.storage.getRequest();
            console.log('GetAllDecorator::decorate [storedRequest, request]', storedRequest, request);
            let initialRequest: any;
            if (!request || isEmpty(request) || (this.checkInitRequest && this.checkInitRequest(request))) {
                if (storedRequest) {
                    console.log(
                        'GetAllDecorator stored request found and rqeuest is initial [storedRequest, request]',
                        storedRequest,
                        request
                    );
                    initialRequest = storedRequest.request;
                }
            }

            // use initial request instead of active request
            const indeedRequest = initialRequest || request;
            console.log('GetAllDecorator [indeedRequest]', indeedRequest);
            return fn(indeedRequest).pipe(tap(result => this.storage.setRequest(indeedRequest, null, result)));
        };
    }

    reset() {
        this.storage.reset();
    }
}

// Change request with data according to response, pageIndex could be different for requesed for example
export type MapResultToRequestFun = (request: any, response: any) => any;

export class RepositoryStorage implements IRepositoryStorage {
    /**
     * If response returns paginator what is different from requested, we should be able map response to request
     */
    constructor(private readonly storage: IValueStorage, private readonly mp?: MapResultToRequestFun) {}

    getRequest() {
        return this.storage.getValue();
    }

    setRequest(request: any, meta: any, response: any) {
        if (this.mp) {
            request = this.mp(request, response);
        }
        const val = { request, meta };
        this.storage.setValue(val);
    }

    reset() {
        this.storage.setValue(null);
    }
}

// Local storage

export class RepositoryLocalStorage extends RepositoryStorage {
    constructor(name: string, map?: MapResultToRequestFun, ttl?: number) {
        super(new ValueLocalStorage(name, ttl), map);
    }
}

export class GetAllLocalStorageDecorator<TState = any, TResult = any> extends GetAllDecorator<TState, TResult> {
    constructor(name: string, map?: MapResultToRequestFun, checkInitState?: CheckInitRequestFun, ttl?: number) {
        super(new RepositoryLocalStorage(name, map, ttl), checkInitState);
    }
}

// Session storage

export class RepositorySessionStorage extends RepositoryStorage {
    constructor(name: string, map?: MapResultToRequestFun, ttl?: number) {
        super(new ValueSessionStorage(name, ttl), map);
    }
}

export class GetAllSessionStorageDecorator<TState = any, TResult = any> extends GetAllDecorator<TState, TResult> {
    constructor(name: string, map?: MapResultToRequestFun, ttl?: number) {
        super(new RepositorySessionStorage(name, map, ttl));
    }
}
