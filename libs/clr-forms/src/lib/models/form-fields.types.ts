import { Mask, TypeaheadConfig } from '@ng-holistic/clr-controls';
import { FormFields } from '@ng-holistic/forms';
import { Subject } from 'rxjs';

export namespace ClrFormFields {
    export interface FieldValidatorsErrorsMap<T = string> {
        [key: string]: T;
    }

    export interface BaseBaseFieldProps<TVal> {
        label?: FormFields.FormFieldProp<string>;
        value?: FormFields.FormFieldProp<TVal>;
        readonly?: FormFields.FormFieldProp<boolean>;
    }

    export type BaseFieldProps<TVal, TExtProps = {}> = BaseBaseFieldProps<TVal> &
        TExtProps & {
            labelClick?: Subject<void>;
        };

    export type BaseFieldPropsP<TVal, TExtProps = {}> = BaseFieldProps<
        TVal,
        TExtProps & {
            placeholder?: FormFields.FormFieldProp<string>;
        }
    >;

    export interface BaseFieldWithProps<TKind extends string, TProps> extends FormFields.FormField<TKind, TProps> {
        /**
         * Dictionary of validation error key / message for control.
         * @example
         * { required : 'This field is required' }
         */
        validatorsErrorsMap?: FieldValidatorsErrorsMap;
    }

    /**
     * Field with label, value, readonly props
     */
    export type BaseField<TKind extends string, TVal = any, TExtProps = {}> = BaseFieldWithProps<
        TKind,
        BaseFieldProps<TVal, TExtProps>
    >;
    /**
     * Field with ...BaseField + placeholder props
     */
    export type BaseFieldP<TKind extends string, TVal = any, TExtProps = {}> = BaseFieldWithProps<
        TKind,
        BaseFieldPropsP<TVal, TExtProps>
    >;

    export type TextField = BaseFieldP<
        'TextField',
        string,
        {
            valueChanged?: Subject<string>;
        }
    >;

    export type SelectField = BaseFieldP<
        'SelectField',
        any,
        {
            disallowEmpty?: FormFields.FormFieldProp<boolean>;
            items: FormFields.FormFieldProp<any[]>;
        }
    >;

    export type MultiSelectField = BaseFieldP<
        'MultiSelectField',
        any[],
        {
            items: FormFields.FormFieldProp<any[]>;
        }
    >;

    export type DateField = BaseField<'DateField', string>;

    export type TextAreaField = BaseFieldP<'TextAreaField', string>;

    export type ToggleField = BaseField<
        'ToggleField',
        boolean,
        {
            text?: string;
        }
    >;

    export type OptionsField = BaseField<
        'OptionsField',
        any,
        {
            items: FormFields.FormFieldProp<any[]>;
        }
    >;

    export type CheckboxesField = BaseField<
        'CheckboxesField',
        any,
        {
            items: FormFields.FormFieldProp<any[]>;
        }
    >;

    export type DateTimeField = BaseField<'DateTimeField', string>;

    export type DateRangeField = BaseField<'DateRangeField'>;

    export type MaskField = BaseFieldP<
        'MaskField',
        string,
        {
            mask: Mask.MaskValue;
            unmask?: Mask.UnmaskFun;
        }
    >;

    export interface PhoneField extends BaseField<'PhoneField'> {}

    export interface PasswordField extends BaseFieldP<'PasswordField'> {}

    export interface PairsListField extends BaseField<'PairsListField'> {}

    export interface TypeaheadField
        extends BaseFieldP<
            'TypeaheadField',
            any,
            {
                config?: FormFields.FormFieldProp<TypeaheadConfig>;
                readonly?: FormFields.FormFieldProp<boolean>;
                allowAddNew?: FormFields.FormFieldProp<boolean>;
                valueChange?: Subject<any>;
                addNew?: Subject<string>;
            }
        > {}

    export interface TagsField
        extends BaseFieldP<
            'TagsField',
            any[],
            {
                config?: FormFields.FormFieldProp<TypeaheadConfig>;
                readonly?: FormFields.FormFieldProp<boolean>;
                allowAddNew?: FormFields.FormFieldProp<boolean>;
                valueChange?: Subject<any>;
                addNew?: Subject<string>;
            }
        > {}

    export type DisplayField = BaseField<
        'DisplayField',
        any,
        {
            format?: FormFields.FormFieldProp<(val: any) => string>;
            icon?: FormFields.FormFieldProp<string>;
            iconTooltipText?: FormFields.FormFieldProp<string>;
            iconClick?: Subject<any>;
        }
    >;

    export type FormField =
        | TextField
        | SelectField
        | MultiSelectField
        | DateField
        | TextAreaField
        | ToggleField
        | OptionsField
        | CheckboxesField
        | DateTimeField
        | DateRangeField
        | FormFields.CustomFormField
        | MaskField
        | PhoneField
        | PasswordField
        | PairsListField
        | TypeaheadField
        | TagsField
        | DisplayField;
}
