import { SubActionContainer, SubFormActions } from '@ng-holistic/ngrx-forms';

export class SubFormAction implements SubActionContainer {
    static Type = '[NgrxForm] SubFormAction';
    type = SubFormAction.Type;

    constructor(public subAction: SubFormActions.SubFormAction) {}
}

export type Actions = SubFormAction;
