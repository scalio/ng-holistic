import { Actions } from '@ngrx/effects';
import * as R from 'ramda';
import { merge, Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { SubFormActions } from './actions';
import { FormDataProvider, SubActionContainerPair } from './store.types';

const create = (dataProvider: FormDataProvider) => (action: SubFormActions.Create) =>
    dataProvider.create(action.data).pipe(
        map(res => new SubFormActions.CreateSuccess(res)),
        catchError(err => of(new SubFormActions.CreateError(err)))
    );

const read = (dataProvider: FormDataProvider) => (action: SubFormActions.Read) =>
    dataProvider.read(action.id).pipe(
        map(res => new SubFormActions.ReadSuccess(res)),
        catchError(err => of(new SubFormActions.ReadError(err)))
    );

const update = (dataProvider: FormDataProvider) => (action: SubFormActions.Update) =>
    dataProvider.update(action.data).pipe(
        map(res => new SubFormActions.UpdateSuccess(res)),
        catchError(err => of(new SubFormActions.UpdateError(err)))
    );

const del = (dataProvider: FormDataProvider) => (action: SubFormActions.Delete) =>
    dataProvider.delete(action.data).pipe(
        map(res => new SubFormActions.DeleteSuccess(res)),
        catchError(err => of(new SubFormActions.DeleteError(err)))
    );

const initDicts = (dataProvider: FormDataProvider) => (action: SubFormActions.InitDicts) =>
    dataProvider.loadDicts(action.id).pipe(
        map(res => new SubFormActions.InitDictsSuccess(res)),
        catchError(err => of(new SubFormActions.InitDictsError(err)))
    );

const handleSubAction = (dataProvider: FormDataProvider) => (
    subAction$: Observable<SubFormActions.SubFormAction>
): Observable<SubFormActions.SubFormAction> =>
    merge(
        subAction$.pipe(
            filter(R.propEq('type', SubFormActions.Create.Type)),
            switchMap(create(dataProvider))
        ),
        subAction$.pipe(
            filter(R.propEq('type', SubFormActions.Read.Type)),
            switchMap(read(dataProvider))
        ),
        subAction$.pipe(
            filter(R.propEq('type', SubFormActions.Update.Type)),
            switchMap(update(dataProvider))
        ),
        subAction$.pipe(
            filter(R.propEq('type', SubFormActions.Delete.Type)),
            switchMap(del(dataProvider))
        ),
        subAction$.pipe(
            filter(R.propEq('type', SubFormActions.InitDicts)),
            switchMap(initDicts(dataProvider))
        )
    );

export const subFormEffects = (dataProvider: FormDataProvider, pair: SubActionContainerPair) => (actions: Actions) =>
    actions.pipe(
        filter(pair.pred),
        map(R.prop('subAction')),
        handleSubAction(dataProvider),
        map(pair.ctr)
    );
