import { FormFields } from '@ng-holistic/forms';

export namespace ClrFormFields {

    //export type ValidatorsErrorsMapFun = (fieldId: string) => string;
    export interface FieldValidatorsErrorsMap { [key: string] : string; }

    export interface BaseField<TKind extends string, TVal = any> extends FormFields.FormField<TKind> {
        label?: FormFields.FormFieldProp<string>;
        value?: FormFields.FormFieldProp<TVal>;
        readonly?: FormFields.FormFieldProp<boolean>;
        /**
         * Dictionary of validation error key / message for control.
         * @example
         * { required : 'This field is required' }
         */
        validatorsErrorsMap?: FieldValidatorsErrorsMap;
    }

    export interface BaseFieldP<TKind extends string, TVal = any> extends BaseField<TKind, TVal> {
        placeholder?: FormFields.FormFieldProp<string>;
    }

    export interface TextField extends BaseFieldP<'TextField', string> {
    }

    export interface SelectField extends BaseFieldP<'SelectField'> {
        items: FormFields.FormFieldProp<any[]>;
    }

    export interface DateField extends BaseField<'DateField', string> {}

    export interface TextAreaField extends BaseFieldP<'TextAreaField', string> {}

    export type FormField = TextField | SelectField | DateField | TextAreaField;
}
