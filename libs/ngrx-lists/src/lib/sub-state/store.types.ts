import { Observable } from 'rxjs';
import { List } from './list.types';
import { SubList } from './actions';
import { Action } from '@ngrx/store';

export interface SubActionContainer {
    type: string;
    subAction: SubList.SubListAction;
}

export type SubActionContainerCtr = (subAction: SubList.SubListAction) => SubActionContainer;
export type SubActionContainerPred = (action: Action) => action is SubActionContainer;

export interface SubActionContainerPair {
    ctr: SubActionContainerCtr;
    pred: SubActionContainerPred;
}

export interface ListDataProvider {
    load(params: List.SearchParams): Observable<List.SearchResult>;
}
