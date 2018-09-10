import { Action } from '@ngrx/store';
import { pair } from './utils';
import { ItemStateModel } from './models';
import { subFormReducer } from '@ng-holistic/ngrx-forms';

export const initialState: ItemStateModel = {
    item: undefined
};

export const reducer = (state = initialState, action: Action) => {
    return subFormReducer(pair)(state, action);
};
