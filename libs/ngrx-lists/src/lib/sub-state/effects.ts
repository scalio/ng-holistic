import { Actions } from '@ngrx/effects';
import * as R from 'ramda';
import { merge, Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { SubList } from './actions';
import { ListDataProvider, SubActionContainerPair } from './store.types';

const load = (dataProvider: ListDataProvider) => (action: SubList.Load) =>
    dataProvider.load(action.data).pipe(
        map(res => new SubList.LoadSuccess(res)),
        catchError(err => of(new SubList.LoadError(err)))
    );

const handleSubAction = (dataProvider: ListDataProvider) => (
    subAction$: Observable<SubList.SubListAction>
): Observable<SubList.SubListAction | undefined> =>
    merge(subAction$.pipe(filter(R.propEq('type', SubList.Load.Type), switchMap(load(dataProvider)))));

export const subListEffects = (dataProvider: ListDataProvider, pair: SubActionContainerPair) => (actions: Actions) =>
    actions.pipe(
        filter(pair.pred),
        map(R.prop('subAction')),
        handleSubAction(dataProvider)
    );
