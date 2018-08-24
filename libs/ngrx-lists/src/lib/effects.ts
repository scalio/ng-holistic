import { Actions } from '@ngrx/effects';
import * as R from 'ramda';
import { merge, Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { SubListActions } from './actions';
import { ListDataProvider, SubActionContainerPair } from './store.types';

const load = (dataProvider: ListDataProvider) => (action: SubListActions.Load) =>
    dataProvider.load(action.data).pipe(
        map(res => new SubListActions.LoadSuccess(res)),
        catchError(err => of(new SubListActions.LoadError(err)))
    );

const handleSubAction = (dataProvider: ListDataProvider) => (
    subAction$: Observable<SubListActions.SubListAction>
): Observable<SubListActions.SubListAction> =>
    merge(
        subAction$.pipe(
            filter(R.propEq('type', SubListActions.Load.Type)),
            switchMap(load(dataProvider))
        )
    );

export const subListEffects = (dataProvider: ListDataProvider, pair: SubActionContainerPair) => (actions: Actions) =>
    actions.pipe(
        filter(pair.pred),
        map(R.prop('subAction')),
        handleSubAction(dataProvider),
        map(pair.ctr)
    );
