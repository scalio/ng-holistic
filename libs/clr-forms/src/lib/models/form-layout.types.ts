import { ClrFormFields } from './form-fields.types';

export namespace ClrFormLayout {

    export interface FormFieldsCollection {
        kind: 'FormFieldsCollection';
        items: ClrFormFields.FormField[];
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
