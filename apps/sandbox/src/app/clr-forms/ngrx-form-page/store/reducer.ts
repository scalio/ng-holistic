import { Action } from '@ngrx/store';
import { pair } from './utils';
import { NgrxPageStateModel } from './models';
import { subFormReducer } from '@ng-holistic/ngrx-forms';

export const initialState: NgrxPageStateModel = {
    item: undefined
};

export const reducer = (state = initialState, action: Action) => {
    return subFormReducer(pair)(state, action);
};
