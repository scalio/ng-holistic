import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

/**
 * Stategy to display control error, for example display errors only when control is dirty or form is submitted
 */

@Injectable()
export class InputErrorDisplayStartegy {
    /*
    * Default strategy display errors only for dirty controls
    */
    shouldDisplayError(control: FormControl): boolean {
        return control.dirty;
    }
}
