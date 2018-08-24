import { subListReducer } from '@ng-holistic/ngrx-lists';
import { Action } from '@ngrx/store';
import { NgrxListStateModel } from '../models/list.types';
import { pair } from './utils';

export const initialState: NgrxListStateModel = {
    items: [],
    filter: null,
    paginator: null,
    sort: null
};

export const reducer = (state = initialState, action: Action) => {
    return subListReducer(pair)(state, action);
};
