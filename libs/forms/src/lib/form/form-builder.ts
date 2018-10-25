import { FormBuilder, FormGroup } from '@angular/forms';
import * as R from 'ramda';
import { FormField } from '../models';
import { Observable, merge } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';

export const buildFormGroup = (formGroup: FormGroup, fb: FormBuilder, inputs: FormField.FormField2[]) =>
    R.pipe(
        R.map<FormField.FormField2, [string, any]>(field => [
            field.id,
            R.propOr<any, any, any[]>([], '$validators', field)
        ]),
        R.forEach(([k, v]: [string, any]) => {
            // when $validators are observable not use them for initialziation
            v = v instanceof Observable ? [] : v;
            return formGroup.addControl(k, fb.control(null, v));
        }),
        _ => formGroup
    )(inputs);

export const sniffAndUpdateValidators = (form: FormGroup, fields: FormField.FormField2[]): Observable<any> | null =>
    fields.reduce((aggr: Observable<any> | null, field: FormField.FormField2) => {
        if (field.$validators && field.$validators instanceof Observable) {
            const stream$ = field.$validators.pipe(
                distinctUntilChanged(),
                tap(val => {
                    form.controls[field.id].setValidators(val || []);
                    form.controls[field.id].updateValueAndValidity({emitEvent: false});
                })
            );
            if (!aggr) {
                return stream$;
            } else {
                return merge(aggr, stream$);
            }
        } else {
            return aggr;
        }
    }, null);


// Does we need this indeed ?
export const sniffAndUpdateComputedFields = (form: FormGroup, fields: FormField.FormField2[]): Observable<any> | null =>
    fields.reduce((aggr: Observable<any> | null, field: FormField.FormField2) => {
        if (field.$compute) {
            const stream$ = field.$compute.pipe(
                distinctUntilChanged(),
                tap(val => {
                    form.controls[field.id].setValue(val);
                })
            );
            if (!aggr) {
                return stream$;
            } else {
                return merge(aggr, stream$);
            }
        } else {
            return aggr;
        }
    }, null);

export const initFormGroup = (formGroup: FormGroup, fb: FormBuilder, inputs: FormField.FormField2[]) => {
    buildFormGroup(formGroup, fb, inputs);
    return sniffAndUpdateValidators(formGroup, inputs);
    //return sniffAndUpdateComputedFields(formGroup, inputs);
};
