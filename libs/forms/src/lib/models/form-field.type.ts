import { Validator } from '@angular/forms';
import { Observable } from 'rxjs';

// import { FormFieldCompnent } from './form-field-component.types';

export namespace FormField {
    export interface BaseField<T extends string> {
        id: string;
        kind: T;
    }

    export interface Field<T extends string = any> extends BaseField<T> {
        [key: string]: any;
    }

    export interface FormField2<T extends string = any> extends Field<T> {
        $validators?: Validator[];
        $compute?: Observable<any>;
    }

    // export interface TextField extends FormFieldCompnent.ITextFieldComponent, BaseField {}
}
