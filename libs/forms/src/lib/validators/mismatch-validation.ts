import { AbstractControl } from '@angular/forms';

export function mismatchValidation(field1: string) {
    return (control: AbstractControl) => {
        if (!control.parent) {
            return null;
        }
        const field1Control = control.parent.get(field1);
        if (field1Control) {
            const val = control.value;
            const val1 = field1Control.value;
            if (val !== val1) {
                return { mismatch: true };
            }
        }

        return null;
    };
}
