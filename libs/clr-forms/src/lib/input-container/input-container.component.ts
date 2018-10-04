import { Component, ContentChild, Input } from '@angular/core';
import { FormBuilder, FormControlName } from '@angular/forms';

@Component({
    selector: 'hlc-input-container',
    templateUrl: './input-container.component.html',
    styleUrls: ['./input-container.component.scss']
})
export class InputContainerComponent {
    @Input() label: string;

    constructor(private readonly fb: FormBuilder) {}

    get isOptional() {
        if (!this.control || !this.control.validator) {
            return false;
        }

        const control = this.fb.control(null);

        const errors = this.control.validator(control);

        if (!errors) {
            return true;
        }

        return !errors['required'];
    }

    @ContentChild(FormControlName) private formControlName: FormControlName;

    get control() {
        return this.formControlName && this.formControlName.control;
    }
}
