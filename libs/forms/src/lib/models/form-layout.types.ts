import { FormFields } from './form-fields.types';

export namespace FormLayout {
    export interface FormFieldsCollection {
        kind: 'FormFieldsCollection';
        items: FormFields.FormField[];
    }

    export interface FormTab {
        title: string;
        content: FormFieldsCollection | FormGroupsCollection;
    }

    export interface FormTabsCollection {
        kind: 'FormTabsCollection';
        items: FormTab[];
    }

    export interface FormGroup {
        title?: string;
        content: FormTabsCollection | FormFieldsCollection;
    }

    export interface FormGroupsCollection {
        kind: 'FormGroupsCollection';
        items: FormGroup[];
    }

    export interface Form {
        content: FormFieldsCollection | FormTabsCollection | FormGroupsCollection;
    }

    export interface Dicts {
        [key: string]: any[];
    }
}
