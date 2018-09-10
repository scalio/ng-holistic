import { Observable } from 'rxjs';
import { SubFormActions } from './actions';
import { Action } from '@ngrx/store';

export interface SubActionContainer {
    type: string;
    subAction: SubFormActions.SubFormAction;
}

export type SubActionContainerCtr = (subAction: SubFormActions.SubFormAction) => SubActionContainer;
export type SubActionContainerPred = (action: Action) => action is SubActionContainer;

export interface SubActionContainerPair {
    ctr: SubActionContainerCtr;
    pred: SubActionContainerPred;
}

export interface FormDataProvider<TId = any, TData = any> {
    create(data: TData): Observable<TData>;
    read(id: TId): Observable<TData>;
    update(data: TData): Observable<TData>;
    delete(id: TId): Observable<any>;
}

export interface FormStateModel<TItem = any> {
    item?: TItem;
}
