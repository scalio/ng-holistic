import { SubFormAction } from '../actions';
import { SubActionContainerPair, SubActionContainer } from '@ng-holistic/ngrx-forms';

export const pair: SubActionContainerPair = {
    ctr: act => new SubFormAction(act),
    pred: (act): act is SubActionContainer => act.type === SubFormAction.Type
};
