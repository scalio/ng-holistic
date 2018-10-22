import { FormBuilder } from '@angular/forms';
import * as R from 'ramda';
import { createValidation } from './form-validation-builder';
import { FormFields, FormLayout } from './models';

export const flatItems = (
    coll: FormLayout.FormFieldsCollection | FormLayout.FormGroupsCollection | FormLayout.FormTabsCollection
): FormFields.FormField[] => {
    if (coll.kind === 'FormFieldsCollection') {
        return coll.items;
    }
    return R.pipe(
        R.pluck('content'),
        R.chain(flatItems as any),
        R.flatten
    )(coll.items) as any;
};

export const flatForm = (form: FormLayout.Form): FormFields.FormField[] => flatItems(form.content);

/**
 * To use with EditBaseComponent

export const buildControlsConfig = (inputs: FormFields.FormField[]): { [key: string]: any } =>
    R.pipe(
        R.map<FormFields.FormField, [string, any]>(field => [
            field.id,
            [null, R.propOr<any, any, any[]>([], 'validators', field).map(createValidation(field))]
        ]),
        R.fromPairs as any
    )(inputs);
*/

export const buildForm = (fb: FormBuilder, inputs: FormFields.FormField[]) =>
    R.pipe(
        R.map<FormFields.FormField, [string, any]>(field => [
            field.id,
            [null, R.propOr<any, any, any[]>([], 'validators', field).map(createValidation(field))]
        ]),
        R.fromPairs as any,
        obj => fb.group(obj)
    )(inputs);

export const emptyValue = (inputs: FormFields.FormField[]) =>
    R.pipe(
        R.map<FormFields.FormField, [string, null]>(field => [field.id, null]),
        R.fromPairs as any
    )(inputs);
