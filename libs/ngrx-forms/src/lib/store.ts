import { Action } from '@ngrx/store';
import { SubActionContainerPair, FormStateModel } from './store.types';
import { SubFormActions } from './actions';

const createSuccess = (state: FormStateModel, action: SubFormActions.CreateSuccess): FormStateModel => {
    return { ...state, item: action.data };
};

const readSuccess = (state: FormStateModel, action: SubFormActions.ReadSuccess): FormStateModel => {
    return { ...state, item: action.data };
};

const updateSuccess = (state: FormStateModel, action: SubFormActions.UpdateSuccess): FormStateModel => {
    return { ...state, item: action.data };
};

export const subFormReducer = (pair: SubActionContainerPair) => (state: FormStateModel, action: Action) => {
    if (!pair.pred(action)) {
        return state;
    }

    switch (action.subAction.type) {
        case SubFormActions.CreateSuccess.Type:
            return createSuccess(state, action.subAction as SubFormActions.CreateSuccess);
        case SubFormActions.ReadSuccess.Type:
            return readSuccess(state, action.subAction as SubFormActions.ReadSuccess);
        case SubFormActions.UpdateSuccess.Type:
            return updateSuccess(state, action.subAction as SubFormActions.UpdateSuccess);
    }

    return state;
};
