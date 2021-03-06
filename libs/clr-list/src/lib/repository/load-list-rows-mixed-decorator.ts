import * as R from 'ramda';
import { isEmpty } from 'ramda';
import { interval } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';
import { CheckInitRequestFun, ILoadListDecorator, LoadListFunc } from './load-list-decorator';
import {
    IRepositoryStorage,
    MapResultToRequestFun,
    RepositoryLocalStorage,
    RepositorySessionStorage
} from './repository-storage';

/**
 * State :
 * When state is null or empty object, get latest state from storage and use one for request.
 * Optionally could use checkInitState - function which check if state is initial in which case
 * override initial state with stored one if it exists.
 * Rows:
 * Persists rows by the latest state.
 * For the same state returns stored response immediately.
 */

export class GetLoadListMixedDecorator<TState, TResult> implements ILoadListDecorator<TState, TResult> {
    constructor(
        private readonly stateStorage: IRepositoryStorage,
        private readonly rowsStorage: IRepositoryStorage,
        private readonly checkInitState?: CheckInitRequestFun
    ) {}
    decorate(fn: LoadListFunc<TState, TResult>): LoadListFunc<TState, TResult> {
        return state => {
            const storedResult = this.stateStorage.getRequest();
            const rowsNotExpired = this.rowsStorage.getRequest();

            let initialState: any;
            if (!state || isEmpty(state) || (this.checkInitState && this.checkInitState(state))) {
                if (storedResult) {
                    // don't override initial state if there is no stored result
                    initialState = storedResult.request;
                }
            }

            if (storedResult && rowsNotExpired && (initialState || R.equals(storedResult.meta.requestState, state))) {
                // There has to be interval, in order to datagrid behave uniformally with http request results
                return interval(0).pipe(mapTo(storedResult.meta.result));
            }

            // use initial state instead of request in case requested state is initial
            return fn(initialState || state).pipe(
                tap(result => {
                    this.stateStorage.setRequest(state, { requestState: state, result }, result);
                    // Use rows storage just to check expiration
                    this.rowsStorage.setRequest(state, null, result);
                })
            );
        };
    }

    reset() {
        this.stateStorage.reset();
        this.rowsStorage.reset();
    }
}

/**
 * For state uses local storage with no ttl
 * For rows uses sessions storage with ttl
 * Which means will not reset state but will reset cached rows
 */
export class GetLoadListMixedStorageDecorator<TState = any, TResult = any> extends GetLoadListMixedDecorator<
    TState,
    TResult
> {
    constructor(name: string, map: MapResultToRequestFun, checkInitState?: CheckInitRequestFun, ttl?: number) {
        super(
            new RepositoryLocalStorage(`${name}.state`, map),
            new RepositorySessionStorage(`${name}.rows`, map, ttl),
            checkInitState
        );
    }
}
