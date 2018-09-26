// import { FormFieldCompnent } from './form-field-component.types';

export namespace FormField {
    export interface BaseField<T extends string> {
        id: string;
        kind: T;
        // label: string;
    }

    // export interface TextField extends FormFieldCompnent.ITextFieldComponent, BaseField {}
}
