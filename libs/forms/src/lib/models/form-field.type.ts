// import { FormFieldCompnent } from './form-field-component.types';

export namespace FormField {
    export interface BaseField<T extends string> {
        id: string;
        kind: T;
        // label: string;
    }

    export interface Field<T extends string = any> extends BaseField<T> {
        [key: string]: any;
    }

    // export interface TextField extends FormFieldCompnent.ITextFieldComponent, BaseField {}
}
