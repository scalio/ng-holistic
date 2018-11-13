import { ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';

export namespace FormFields {

    export type FormFieldProp<T = any> = T | Observable<T>;

    export interface BaseField<T extends string> {
        id: string;
        kind: T;
    }

    export interface Field<T extends string = any> extends BaseField<T> {
        [key: string]: any;
    }

    export interface FormField<T extends string = any> extends BaseField<T> {
        $validators?: FormFieldProp<ValidatorFn[]>;
    }

    export type ViewNodeSelector = 'self' | 'first-child' | string;

    export interface CustomFormField extends FormField<'CustomField'> {
        valueAccessor?: ViewNodeSelector;
    }
}
