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
    getState(): any;
    setResult(result: any): void;
    resetState(): void;
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
            if (!state || isEmpty(state)) {
                state = this.storage.getState();
            } else if (this.checkInitState && this.checkInitState(state)) {
                const storedState = this.storage.getState();
                if (storedState) {
                    // don't override initial state if there is no stored state
                    state = storedState;
                }
            }

            return fn(state).pipe(tap(result => this.storage.setResult(result)));
        };
    }

    reset() {
        this.storage.resetState();
    }
}

export class RepositoryStorage<TState, TResult> implements IRepositoryStorage {
    constructor(private readonly map: ((state: TState) => TResult), private readonly storage: IValueStorage) {}

    getState() {
        return this.storage.getValue();
    }

    setResult(result: any) {
        const state = this.map(result);
        this.storage.setValue(state);
    }

    resetState() {
        this.storage.setValue(null);
    }
}

export type MapStateResultFun<TState, TResult> = (state: TState) => TResult;

// Local storage

export class RepositoryLocalStorage<TState, TResult> extends RepositoryStorage<TState, TResult> {
    constructor(name: string, map: MapStateResultFun<TState, TResult>) {
        super(map, new ValueLocalStorage(name));
    }
}

export class GetAllLocalStorageDecorator<TState = any, TResult = any> extends GetAllDecorator<TState, TResult> {
    constructor(name: string, map: MapStateResultFun<TState, TResult>, checkInitState?: CheckInitStateFun<TState>) {
        super(new RepositoryLocalStorage(name, map), checkInitState);
    }
}

// Session storage

export class RepositorySessionStorage<TState, TResult> extends RepositoryStorage<TState, TResult> {
    constructor(name: string, map: MapStateResultFun<TState, TResult>) {
        super(map, new ValueSessionStorage(name));
    }
}

export class GetAllSessionStorageDecorator<TState = any, TResult = any> extends GetAllDecorator<TState, TResult> {
    constructor(name: string, map: MapStateResultFun<TState, TResult>) {
        super(new RepositorySessionStorage(name, map));
    }
}
