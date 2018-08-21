import { AbstractControl } from '@angular/forms';

/**
 * Every text reach editor has own empty value placeholder, this one works with ckeditor
 */
export function ckeditorRequiredValidation(control: AbstractControl) {
    const val = control.value;
    if (!val) {
        return { required: true };
    }

    if (val === '<p>&nbsp;</p>') {
        return { required: true };
    }

    return null;
}
