import { AbstractControl, ValidatorFn } from '@angular/forms';

export const noWhitespaceValidator: ValidatorFn = (control: AbstractControl): { noWhitespace: any } | null => {
    const val = control.value as string;
    const isNull = val === null || val === undefined || val === '';
    const isEmpty = !isNull && val.trim().length === 0;
    return isEmpty ? { noWhitespace: 'value is only whitespace' } : null;
};
