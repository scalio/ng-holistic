import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class FilterService {
    readonly formSet = new BehaviorSubject<any>(null);

    setForm(form: FormGroup) {
        this.formSet.next(form);
    }

    get value() {
        // delay value providing till form is set
        return this.formSet.pipe(
            filter(f => !!f),
            map(form => form.value)
        );
    }
}
