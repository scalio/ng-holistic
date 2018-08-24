import { List } from './list.types';
import { Action } from '@ngrx/store';
import { SubActionContainerPair } from './store.types';
import { SubList } from './actions';

const load = (state: List.StateModel<List.ItemBase>, action: SubList.Load): List.StateModel<List.ItemBase> => {
    return { ...state, filter: action.data.filter };
};

const loadSuccess = (
    state: List.StateModel<List.ItemBase>,
    action: SubList.LoadSuccess
): List.StateModel<List.ItemBase> => {
    return { ...state, ...action.data };
};

export const subReducer = (pair: SubActionContainerPair) => (state: List.StateModel<List.ItemBase>, action: Action) => {
    if (!pair.pred(action)) {
        return state;
    }

    switch (action.type) {
        case SubList.Load.Type:
            return load(state, action.subAction as SubList.Load);
        case SubList.LoadSuccess.Type:
            return loadSuccess(state, action.subAction as SubList.LoadSuccess);
    }

    return state;
};
