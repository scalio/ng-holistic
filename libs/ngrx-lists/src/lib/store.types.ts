import { Observable } from 'rxjs';
import { List } from '@ng-holistic/lists';
import { SubListActions } from './actions';
import { Action } from '@ngrx/store';

export interface SubActionContainer {
    type: string;
    subAction: SubListActions.SubListAction;
}

export type SubActionContainerCtr = (subAction: SubListActions.SubListAction) => SubActionContainer;
export type SubActionContainerPred = (action: Action) => action is SubActionContainer;

export interface SubActionContainerPair {
    ctr: SubActionContainerCtr;
    pred: SubActionContainerPred;
}

export interface ListDataProvider {
    load(params: List.SearchParams): Observable<List.SearchResult>;
}
