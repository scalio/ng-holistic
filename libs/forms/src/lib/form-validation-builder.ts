import { Validators } from '@angular/forms';
import { ckeditorRequiredValidation, compareDateUnit, compareValidation } from './validators';
import { FormFields } from './models';

const createDateCompareValidation = (
    field: FormFields.DateField | FormFields.DateTimeField,
    validation: FormFields.CompareDateValidation
) => {
    const comparer = compareDateUnit(field.kind === 'DateField' ? 'day' : 'second');
    return compareValidation(validation.compareField, comparer(validation.oper), validation.error);
};

const createComplexValidation = (field: FormFields.FormField, validation: FormFields.FormField) => {
    switch (validation['kind'] as string) {
        case 'CompareDateValidation':
            return createDateCompareValidation(field as any, validation as any);
        default:
            console.log('Unknown validation', validation);
            throw new Error('Unknown validation');
    }
};

const createRequiredValidation = (field: FormFields.FormField) => {
    if (field.kind === 'RichTextField') {
        return ckeditorRequiredValidation;
    } else {
        return Validators.required;
    }
};

export const createValidation = (field: FormFields.FormField) => (validation: FormFields.FieldValidation) => {
    switch (validation) {
        case 'required':
            return createRequiredValidation(field);
        case 'email':
            return Validators.email;
        default:
            return createComplexValidation(field, validation);
    }
};
