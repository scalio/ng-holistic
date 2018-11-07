import { ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';

// import { FormFieldCompnent } from './form-field-component.types';

export namespace FormFields {
    export interface BaseField<T extends string> {
        id: string;
        kind: T;
    }

    export interface Field<T extends string = any> extends BaseField<T> {
        [key: string]: any;
    }

    export interface FormField<T extends string = any> extends Field<T> {
        $validators?: ValidatorFn[] | Observable<ValidatorFn[]>;
    }
}
