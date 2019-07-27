import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { isEmpty } from 'ramda';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class FilterService {
    readonly formSet$ = new BehaviorSubject<FormGroup | null | undefined>(undefined);

    setForm(form: FormGroup | null) {
        this.formSet$.next(form);
    }

    get value() {
        // delay value providing till form is set
        return this.formSet$.pipe(
            filter(f => f !== undefined),
            map(form => form && form.value)
        );
    }

    setValue(val: any) {
        const form = this.formSet$.value;
        if (!form) {
            console.warn('form is not set');
            return;
        }
        if (!val || isEmpty(val)) {
            form.reset();
        } else {
            form.patchValue(val);
        }
    }
}
