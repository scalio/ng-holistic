import { FormBuilder, FormGroup } from '@angular/forms';
import * as R from 'ramda';
import { FormFields } from '../models';
import { Observable, merge } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';

export const buildFormGroup = (formGroup: FormGroup, fb: FormBuilder, inputs: FormFields.FormField[]) =>
    R.pipe(
        R.map<FormFields.FormField, [string, any]>(field => [
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

export const sniffAndUpdateValidators = (form: FormGroup, fields: FormFields.FormField[]): Observable<any> | null =>
    fields.reduce((aggr: Observable<any> | null, field: FormFields.FormField) => {
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

export const sniffAndUpdateVisibility = (form: FormGroup, fields: FormFields.FormField[]): Observable<any> | null =>
    fields.reduce((aggr: Observable<any> | null, field: FormFields.FormField) => {
        if (field.$hidden && field.$hidden instanceof Observable) {
            const stream$ = field.$hidden.pipe(
                distinctUntilChanged(),
                tap(hide => {
                    if (hide) {
                        console.log(`disable field ${field.id}`);
                        form.controls[field.id].disable();
                    } else {
                        console.log(`enable field ${field.id}`);
                        form.controls[field.id].enable();
                    }
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


export const initFormGroup = (formGroup: FormGroup, fb: FormBuilder, inputs: FormFields.FormField[]) => {
    buildFormGroup(formGroup, fb, inputs);

    const sniff = [
        sniffAndUpdateValidators(formGroup, inputs),
        sniffAndUpdateVisibility(formGroup, inputs)
    ].filter(x => !!x) as Observable<any>[];

    return sniff.length ? merge(...sniff) : null;
};
