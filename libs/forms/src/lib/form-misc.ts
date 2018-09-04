import { FormGroup, AbstractControl } from '@angular/forms';
import * as R from 'ramda';
import { FormFields } from './models';

export const flatGroups = R.chain<FormFields.FormField | FormFields.FormGroup, FormFields.FormField>(
    field => (field.kind === 'FormGroupTab' ? field.fields : [field])
);

export const getTabControls = (tab: FormFields.FormGroup, form: FormGroup): AbstractControl[] =>
    R.pipe(
        R.prop('fields'),
        R.map(R.prop('id')),
        R.map(id => form.controls[id as string])
    )(tab) as AbstractControl[];

export const tabHasErrors = (tab: FormFields.FormGroup, form: FormGroup) => {
    return getTabControls(tab, form).some(ctrl => !!ctrl.errors);
};
