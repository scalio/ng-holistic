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
        [key: string]: any;
    }

    export interface FormField<T extends string = any> extends BaseField<T> {
        $validators?: FormFieldProp<ValidatorFn[]>;
        /**
         * Hide field and disable asscoited form control
         */
        $hidden?: Observable<boolean>;
        $value?: Observable<any>;
    }

    /**
     * self - first element in the View
     * first-child - first child of the first element in the view
     * `string` - id of the component in the view
     */
    export type ViewNodeSelector = 'self' | 'first-child' | string;

    export interface CustomFormField extends FormField<'CustomField'> {
        valueAccessor?: ViewNodeSelector;
        $hidden?: Observable<boolean>;
    }
}
