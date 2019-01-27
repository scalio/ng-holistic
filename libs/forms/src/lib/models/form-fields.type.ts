import { ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';

export namespace FormFields {
    export type FormFieldProp<T = any> = T | Observable<T>;

    export interface BaseField<T extends string> {
        id: string;
        kind: T;
        value?: any;
    }

    export interface Field<T extends string = any> extends BaseField<T> {
        /**
         * Input / Output properties of the component
         */
        props?: { [key: string]: any };
    }

    export interface FormField<T extends string = any, TProps = { [key: string]: any }> extends BaseField<T> {
        validators?: FormFieldProp<ValidatorFn[]>;
        /**
         * Hide field and disable asscoited form control
         */
        hidden?: Observable<boolean>;
        value?: Observable<any>;
        /**
         * Convention property, the same as props.label, since supposenly
         * each field definition will have `label` property
         * and it would be inconvinient to define each time `{ props : { label : 'Label' } }
         */
        label?: string;
        props?: TProps;
    }

    /**
     * self - first element in the View
     * first-child - first child of the first element in the view
     * `string` - id of the component in the view
     */
    export type ViewNodeSelector = 'self' | 'first-child' | string;

    export interface CustomFormField extends FormField<'CustomField'> {
        valueAccessor?: ViewNodeSelector;
        hidden?: Observable<boolean>;
    }
}
