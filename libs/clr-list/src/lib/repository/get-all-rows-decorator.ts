import * as R from 'ramda';
import { isEmpty } from 'ramda';
import { interval } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';
import {
    CheckInitStateFun,
    GetAllFunc,
    IGetAllDecorator,
    IRepositoryStorage,
    MapResultFun,
    RepositoryLocalStorage,
    RepositorySessionStorage
} from './get-all-decorator';

/**
 * State :
 * When state is null or empty object, get latest state from storage and use one for request.
 * Optionally could use checkInitState - function which check if state is initial in which case
 * override initial state with stored one if it exists.
 * Rows:
 * Persists rows by the latest state.
 * For the same state returns stored response immediately.
 */

export class GetAllRowsDecorator<TState, TResult> implements IGetAllDecorator<TState, TResult> {
    constructor(
        private readonly storage: IRepositoryStorage,
        private readonly checkInitState?: CheckInitStateFun<TState>
    ) {}
    decorate(fn: GetAllFunc<TState, TResult>): GetAllFunc<TState, TResult> {
        return state => {
            const storedResult = this.storage.getResult();

            console.log('GetAllRowsDecorator::decorate [storedResult, state]', storedResult, state);

            let initialState: any;
            if (!state || isEmpty(state) || (this.checkInitState && this.checkInitState(state))) {
                if (storedResult) {
                    // don't override initial state if there is no stored result
                    initialState = storedResult.state;
                }
            }

            if (storedResult && (initialState || R.equals(storedResult.meta.requestState, state))) {
                console.log('GetAllRowsDecorator storedResult match or initalState, return from cache');
                // There has to be interval, in order to datagrid behave uniformally with http request results
                return interval(0).pipe(mapTo(storedResult.meta.result));
            }

            // use initial state insted of request in case requested state is initial
            return fn(initialState || state).pipe(
                tap(result => this.storage.setResult(result, { requestState: state, result, expired: 1000 }))
            );
        };
    }

    reset() {
        this.storage.reset();
    }
}

export class GetAllRowsLocalStorageDecorator<TState = any, TResult = any> extends GetAllRowsDecorator<TState, TResult> {
    constructor(name: string, map: MapResultFun, checkInitState?: CheckInitStateFun<TState>) {
        super(new RepositoryLocalStorage(name, map), checkInitState);
    }
}

export class GetAllRowsSessionStorageDecorator<TState = any, TResult = any> extends GetAllRowsDecorator<
    TState,
    TResult
> {
    constructor(name: string, map: MapResultFun, checkInitState?: CheckInitStateFun<TState>) {
        super(new RepositorySessionStorage(name, map), checkInitState);
    }
}
