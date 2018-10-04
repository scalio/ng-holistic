import { Component, Host, Input, Optional, SkipSelf } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective } from '@angular/forms';

@Component({
    selector: 'hlc-input-container',
    templateUrl: './input-container.component.html',
    styleUrls: ['./input-container.component.scss']
})
export class InputContainerComponent {
    @Input() label: string;
    @Input() id: string;

    //@ts-ignore
    constructor(
        private readonly fb: FormBuilder,
        @Optional()
        @Host()
        @SkipSelf()
        private formGroupDirective: FormGroupDirective
    ) {}

    get isOptional() {
        if (!this.control) {
            return false;
        }

        if (!this.control.validator) {
            return true;
        }

        const control = this.fb.control(null);

        const errors = this.control.validator(control);

        if (!errors) {
            return true;
        }

        return !errors['required'];
    }

    get control(): FormControl | undefined {
        return this.formGroupDirective && this.id && (this.formGroupDirective.control.controls[this.id] as any);
    }
}
