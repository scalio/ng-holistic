import { ActivatedRouteSnapshot } from '@angular/router';
import { merge, Observable } from 'rxjs';
import { filter, map, mapTo, take } from 'rxjs/operators';
import { SubActionContainerPair, SubActionContainerPred } from '../store.types';
import { SubFormActions } from '../actions';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { PreloadItemConfig } from './preload-item.config';
import * as R from 'ramda';

const filterSuccess = ($: Observable<SubFormActions.ReadSuccess | SubFormActions.ReadError>) =>
    $.pipe(
        filter<SubFormActions.ReadSuccess>(action => action instanceof SubFormActions.ReadSuccess),
        map(({ data }) => data)
    );

const filterError = ($: Observable<SubFormActions.ReadSuccess | SubFormActions.ReadError>) =>
    $.pipe(
        filter(action => action instanceof SubFormActions.ReadError),
        mapTo(null)
    );

const filterSubAction = ($: Observable<SubFormActions.ReadSuccess | SubFormActions.ReadError>) =>
    merge(filterSuccess($), filterError($));

const mapActions = (pred: SubActionContainerPred) => (actions$: Actions) =>
    actions$.pipe(
        filter(pred),
        map(({ subAction }) => subAction),
        // even if load item returns error, return back null to not halt routing
        filterSubAction,
        take(1)
    );

export const resolvePreloadItem = (pair: SubActionContainerPair) => (
    store: Store<any>,
    actions$: Actions,
    config: PreloadItemConfig
) => {
    return (route: ActivatedRouteSnapshot) => {
        const id = config.getItemId(route);
        if (R.isNil(id)) {
            return null;
        }

        // subscribe to read item before dispatch Read
        // since one could load item immmediately
        const item = actions$.pipe(mapActions(pair.pred)).toPromise();

        store.dispatch(pair.ctr(new SubFormActions.Read(id)));

        return item;
    };
};
