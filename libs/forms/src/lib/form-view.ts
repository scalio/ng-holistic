import { Dicts } from '@ng-holistic/ngrx-forms';
import * as R from 'ramda';
import { Observable, of } from 'rxjs';
import { FormFields } from './models';

/**
 * converts form declartaion to form definition
 * ---
 * declaration - defines form by user, different types for the same field properties are allowed
 * readonly - boolean, Observable<boolean>
 * items - any[], Observable<any>, undefined
 * ---
 * definition - converted from declaration, only observables for field properties are allowed
 * readonly - Observable<boolean>
 * items - Observable<any[]>
 */
//

const mapFieldToView = (dicts: Dicts) => (field: FormFields.FormField) => {
    if (!R.isNil(field.readonly) && !(field.readonly instanceof Observable)) {
        field = { ...field, readonly: of(field.readonly) };
    }
    if (field.kind === 'SelectField') {
        if (!R.isNil(field.items) && !(field.items instanceof Observable)) {
            field = { ...field, items: of(field.items) };
        }
        if (R.isNil(field.items)) {
            field = { ...field, items: of(dicts[field.id]) };
        }
    }
    return field;
};

export const mapFieldsToView = (dicts: Dicts, fields: FormFields.FormField[]): FormFields.FormField[] =>
    R.map(mapFieldToView(dicts), fields);
