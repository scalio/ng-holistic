import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

/**
 * Strategy to display control error, for example display errors only when control is dirty or form is submitted
 */

@Injectable()
export class InputErrorDisplayStrategy {
    /*
    * Default strategy display errors only for dirty controls
    */
    shouldDisplayError(control: FormControl): boolean {
        return control.dirty;
    }
}
