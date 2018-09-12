import { Observable } from 'rxjs';
import { TypeaheadConfig } from '@ng-holistic/clr-controls';

export namespace FormFields {
    export type CompareOperator = 'lt' | 'lte' | 'gt' | 'gte' | 'eq';

    //
    export type BaseFieldValidation = 'required';

    export interface BaseField {
        id: string;
        label: string;
        readonly?: boolean | Observable<boolean>;
    }

    export type TextFieldValidation = BaseFieldValidation | 'email';

    export interface TextField extends BaseField {
        kind: 'TextField';
        validators?: TextFieldValidation[];
    }

    export interface SelectField extends BaseField {
        kind: 'SelectField';
        items?: any[] | Observable<any[]>;
        validators?: BaseFieldValidation[];
    }

    export interface TextareaField extends BaseField {
        kind: 'TextareaField';
        validators?: BaseFieldValidation[];
    }

    export interface RichTextField extends BaseField {
        kind: 'RichTextField';
        validators?: BaseFieldValidation[];
    }

    export interface CompareDateValidation {
        kind: 'CompareDateValidation';
        compareField: string;
        oper: CompareOperator;
        error: string;
    }

    export type DateFieldValidation = BaseFieldValidation | CompareDateValidation;

    export interface DateField extends BaseField {
        kind: 'DateField';
        validators?: DateFieldValidation[];
    }

    export interface DateTimeField extends BaseField {
        kind: 'DateTimeField';
        validators?: DateFieldValidation[];
    }

    export interface TagsField extends BaseField {
        kind: 'TagsField';
        validators?: BaseFieldValidation[];
    }

    export interface FileField extends BaseField {
        kind: 'FileField';
        accept: string;
        mullti?: boolean;
        validators?: BaseFieldValidation[];
    }

    export interface ImageField extends BaseField {
        kind: 'ImageField';
        mullti?: boolean;
        validators?: BaseFieldValidation[];
    }

    export interface UrlField extends BaseField {
        kind: 'UrlField';
        validators?: BaseFieldValidation[];
    }

    export interface CategoryField extends BaseField {
        kind: 'CategoryField';
        validators?: BaseFieldValidation[];
        // TODO
        categories: any[];
    }

    export interface TextReadonlyField extends BaseField {
        kind: 'TextReadonlyField';
        unmask?: 'date' | 'dateTime';
        showWhenDefined?: boolean;
    }

    export interface MaskField extends BaseField {
        kind: 'MaskField';
        mask: (string | RegExp)[];
        unmask?: (val: string) => any;
        validators?: BaseFieldValidation[];
    }

    export interface TagsField extends BaseField {
        kind: 'TagsField';
        config: TypeaheadConfig;
        validators?: BaseFieldValidation[];
    }

    export interface TyepaheadField extends BaseField {
        kind: 'TypeaheadField';
        config: TypeaheadConfig;
        validators?: BaseFieldValidation[];
    }

    export type FormField =
        | TextField
        | SelectField
        | TextareaField
        | RichTextField
        | DateField
        | DateTimeField
        | TagsField
        | FileField
        | ImageField
        | UrlField
        | CategoryField
        | TextReadonlyField
        | MaskField
        | TagsField
        | TyepaheadField;

    export type FieldValidation = BaseFieldValidation | TextFieldValidation;

    //

    export type FormGroupKind = 'FormGroupTab';

    export interface FormGroup {
        title: string;
        kind: FormGroupKind;
        fields: FormField[];
    }

    export type FormContent = FormField[] | FormGroup[];
}
