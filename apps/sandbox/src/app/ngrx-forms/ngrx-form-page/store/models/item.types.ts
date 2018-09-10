import { FormStateModel } from '@ng-holistic/ngrx-forms';

export interface Item {
    id?: string;
    name: string;
}

export type ItemStateModel = FormStateModel<Item>;
