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
 * When state is null or empty object, get latest state from storage and use one for request
 */

export class GetAllDecorator<TState, TResult> implements IGetAllDecorator<TState, TResult> {
    constructor(private readonly storage: IRepositoryStorage) {}
    decorate(fn: GetAllFunc<TState, TResult>): GetAllFunc<TState, TResult> {
        return state => {
            if (!state || isEmpty(state)) {
                state = this.storage.getState();
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

// Local storage

export class RepositoryLocalStorage<TState, TResult> extends RepositoryStorage<TState, TResult> {
    constructor(name: string, map: ((state: TState) => TResult)) {
        super(map, new ValueLocalStorage(name));
    }
}

export class GetAllLocalStorageDecorator<TState = any, TResult = any> extends GetAllDecorator<TState, TResult> {
    constructor(name: string, map: ((state: TState) => TResult)) {
        super(new RepositoryLocalStorage(name, map));
    }
}

// Session storage

export class RepositorySessionStorage<TState, TResult> extends RepositoryStorage<TState, TResult> {
    constructor(name: string, map: ((state: TState) => TResult)) {
        super(map, new ValueSessionStorage(name));
    }
}

export class GetAllSessionStorageDecorator<TState = any, TResult = any> extends GetAllDecorator<TState, TResult> {
    constructor(name: string, map: ((state: TState) => TResult)) {
        super(new RepositorySessionStorage(name, map));
    }
}
