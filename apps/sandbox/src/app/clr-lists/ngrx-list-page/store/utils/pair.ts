import { SubActionContainerPair, SubActionContainer } from '@ng-holistic/ngrx-lists';
import { SubListAction } from '../actions';

export const pair: SubActionContainerPair = {
    ctr: act => new SubListAction(act),
    pred: (act): act is SubActionContainer => act.type === SubListAction.Type
};
