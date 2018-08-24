import { SubActionContainer, SubListActions } from '@ng-holistic/ngrx-lists';

export class SubListAction implements SubActionContainer {
    static Type = '[NgrxListPage] SubListAction';
    type = SubListAction.Type;

    constructor(public subAction: SubListActions.SubListAction) {}
}

export type Actions = SubListAction;
