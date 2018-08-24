import { List } from '@ng-holistic/lists';
import { Action } from '@ngrx/store';
import { SubActionContainerPair } from './store.types';
import { SubListActions } from './actions';

const load = (state: List.StateModel<List.ItemBase>, action: SubListActions.Load): List.StateModel<List.ItemBase> => {
    return { ...state, filter: action.data.filter };
};

const loadSuccess = (
    state: List.StateModel<List.ItemBase>,
    action: SubListActions.LoadSuccess
): List.StateModel<List.ItemBase> => {
    return { ...state, ...action.data };
};

export const subListReducer = (pair: SubActionContainerPair) => (
    state: List.StateModel<List.ItemBase>,
    action: Action
) => {
    if (!pair.pred(action)) {
        return state;
    }

    switch (action.type) {
        case SubListActions.Load.Type:
            return load(state, action.subAction as SubListActions.Load);
        case SubListActions.LoadSuccess.Type:
            return loadSuccess(state, action.subAction as SubListActions.LoadSuccess);
    }

    return state;
};
