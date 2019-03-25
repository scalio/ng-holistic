import { isEmpty } from 'ramda';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IValueStorage, ValueLocalStorage } from './value-storage';

export type GetAllFunc<TState, TResult> = (state: TState) => Observable<TResult>;

export type GetAllDecorator<TState, TResult> = (fn: GetAllFunc<TState, TResult>) => GetAllFunc<TState, TResult>;

export interface IRepositoryStorage {
    getState(): any;
    setResult(result: any): void;
}

/**
 * When state is null or empty object, get latest state from storage and use one for request
 */
export const getAllDecorator = <TState, TResult>(
    storage: IRepositoryStorage
): GetAllDecorator<TState, TResult> => fn => state => {
    if (!state || isEmpty(state)) {
        state = storage.getState();
    }

    return fn(state).pipe(tap(result => storage.setResult(result)));
};

export class RepositoryStorage<TState, TResult> implements IRepositoryStorage {
    constructor(private readonly map: ((state: TState) => TResult), private readonly storage: IValueStorage) {}

    getState() {
        return this.storage.getValue();
    }

    setResult(result: any) {
        const state = this.map(result);
        this.storage.setValue(state);
    }
}

export class RepositoryLocalStorage<TState, TResult> extends RepositoryStorage<TState, TResult> {
    constructor(name: string, map: ((state: TState) => TResult)) {
        super(map, new ValueLocalStorage(name));
    }
}

export const getAllLocalStorageDecorator = <TState = any, TResult = any>(
    name: string,
    map: ((state: TState) => TResult)
) => getAllDecorator(new RepositoryLocalStorage(name, map));
