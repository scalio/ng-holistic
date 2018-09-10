import { FormStateModel } from '@ng-holistic/ngrx-forms';

export interface Item {
    id?: string;
    name: string;
    date?: string;
    color?: string;
    description: string;
    age?: number;
}

export type NgrxPageStateModel = FormStateModel<Item>;
