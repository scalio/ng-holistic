import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class FilterService {
    private form: FormGroup;

    setForm(form: FormGroup) {
        this.form = form;
    }

    get value() {
        return this.form && this.form.value;
    }
}
