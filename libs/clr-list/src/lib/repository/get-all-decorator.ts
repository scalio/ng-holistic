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
    getResult(): { state: any; meta: any };
    setResult(result: any, meta: any): void;
    reset(): void;
}

/**
 * Determine if state is initial, i.e. first load on component initialization
 */
export type CheckInitStateFun<TState> = (state: TState) => boolean;

/**
 * When state is null or empty object, get latest state from storage and use one for request.
 * Optionally could use checkInitState - function which check if state is initial in which case
 * override initial state with stored one if it exists
 */

export class GetAllDecorator<TState, TResult> implements IGetAllDecorator<TState, TResult> {
    constructor(
        private readonly storage: IRepositoryStorage,
        private readonly checkInitState?: CheckInitStateFun<TState>
    ) {}
    decorate(fn: GetAllFunc<TState, TResult>): GetAllFunc<TState, TResult> {
        return state => {
            const storedResult = this.storage.getResult();
            let initialState: any;
            if (!state || isEmpty(state) || (this.checkInitState && this.checkInitState(state))) {
                if (storedResult) {
                    initialState = storedResult.state;
                }
            }

            // use initial state insted of request in case requested state is initial
            return fn(initialState || state).pipe(tap(result => this.storage.setResult(result, null)));
        };
    }

    reset() {
        this.storage.reset();
    }
}

export type MapResultFun = (result: any) => any;

export class RepositoryStorage implements IRepositoryStorage {
    constructor(private readonly map: MapResultFun, private readonly storage: IValueStorage) {}

    getResult() {
        return this.storage.getValue();
    }

    setResult(result: any, meta: any) {
        const state = this.map(result);
        const val = { state, meta };
        this.storage.setValue(val);
    }

    reset() {
        this.storage.setValue(null);
    }
}

// Local storage

export class RepositoryLocalStorage extends RepositoryStorage {
    constructor(name: string, map: MapResultFun, ttl?: number) {
        super(map, new ValueLocalStorage(name, ttl));
    }
}

export class GetAllLocalStorageDecorator<TState = any, TResult = any> extends GetAllDecorator<TState, TResult> {
    constructor(name: string, map: MapResultFun, checkInitState?: CheckInitStateFun<TState>, ttl?: number) {
        super(new RepositoryLocalStorage(name, map, ttl), checkInitState);
    }
}

// Session storage

export class RepositorySessionStorage extends RepositoryStorage {
    constructor(name: string, map: MapResultFun, ttl?: number) {
        super(map, new ValueSessionStorage(name, ttl));
    }
}

export class GetAllSessionStorageDecorator<TState = any, TResult = any> extends GetAllDecorator<TState, TResult> {
    constructor(name: string, map: MapResultFun, ttl?: number) {
        super(new RepositorySessionStorage(name, map, ttl));
    }
}
