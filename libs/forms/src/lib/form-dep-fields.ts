import { AbstractControl, FormGroup } from '@angular/forms';
import * as R from 'ramda';
import { merge, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FormFields } from './models';

// TODO : Hell of the logic here, write tests

/**
 * Angular only updates validation for the input which value was changed,
 * so straightforward  way to handle case when one field validation depends on another's field value
 * is manually  trace value change for particular control and then update validation on another,
 * this is not very convenient so helper method was created which update validation of the inputs
 * by declarative validation map structure { parentField: [dependentField] } which allow to extract
 * this dependency map from declarative validation structure which in turns allow handle cases like this automatically.
 */

export interface DepMap {
    [key: string]: string[];
}

/**
 * Problem
 * Angular validate only controls which value is changed right now.
 * If we have dependent field validations (see compareValidation for example) validation check wouldn't
 * be executed on them
 * till this dependent feild not changed itself, but control could be already valid / invalid
 * if related field is changed.
 * We need to fix it.
 *
 */

/**
Given control names and form returns stream of events [controlName, value] when value of the control is changed
*/
export const controlValueChanges = (
    fields: string[]
): ((x: { [key: string]: AbstractControl }) => Observable<[string, any]>) =>
    R.pipe(
        R.pick(fields),
        R.values,
        R.addIndex(R.map)((ctrl: AbstractControl, i) => ctrl.valueChanges.pipe(map(val => [fields[i], val]))),
        x => merge(...(x as any))
    ) as any;

/**
Given map of control names and dependent fields returns stream of events [control, depControls[]] when value is changed
*/
export const controlValueDependentChanges = (depFields: DepMap, form: FormGroup) => {
    const keys = R.keys(depFields) as string[];
    return controlValueChanges(keys)(form.controls).pipe(
        map(([key, _]) => [
            form.controls[key],
            R.pipe(
                R.prop('controls'),
                R.pick(depFields[key]),
                R.values
            )(form)
        ])
    ) as Observable<[AbstractControl, AbstractControl[]]>;
};

/**
 * Given map of {control : dependent controls}, update depedent controls validation when control value is changed.
 * Returns observable, which must be subscribed
 */
export const updateDepFieldsValidation = (depFields: DepMap, form: FormGroup) =>
    controlValueDependentChanges(depFields, form).pipe(
        tap(([_, ctrls]) =>
            ctrls.forEach(ctrl => {
                ctrl.markAsDirty();
                ctrl.markAsTouched();
                ctrl.updateValueAndValidity();
            })
        )
    );

const getDateTimeDeps = (field: FormFields.DateField | FormFields.DateTimeField) => {
    const validations: FormFields.CompareDateValidation[] = (field.validators || []).filter(
        (f: any) => f.kind === 'CompareDateValidation'
    ) as any;
    if (validations.length > 0) {
        // compareField is actually parent field, and current field is dependent
        return validations.map(m => m.compareField).map(m => [m, field.id]);
    }
    return [];
};

/**
 * Given fields extract dependent validations from it and build dependent fields map DepMap.
 */
export const createDepFieldsMapFromValidation = (inputs: FormFields.FormField[]) =>
    R.pipe(
        R.chain((field: FormFields.FormField) => {
            if (field.kind === 'DateField' || field.kind === 'DateTimeField') {
                return getDateTimeDeps(field);
            }
            return [];
        }),
        // here we have flat list of ungrouped [field, depFields], should group it -> {field: [depFields]}
        R.reduce((acc: any, val: [string, string]) => {
            // accumulated object id map { field: [depFields] }, just add dep field to the iterated field
            acc[val[0]] = [...(acc[val[0]] || []), val[1]];
            return acc;
        }, {}) as any
    )(inputs) as DepMap;
