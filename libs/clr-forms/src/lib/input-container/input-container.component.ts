import { ChangeDetectorRef, Component, Host, Input, OnDestroy, OnInit, Optional, SkipSelf } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ClrFormFields } from '../models';

@Component({
    selector: 'hlc-input-container',
    templateUrl: './input-container.component.html',
    styleUrls: ['./input-container.component.scss']
})
export class InputContainerComponent implements OnInit, OnDestroy {
    private readonly destroy$ = new Subject();

    @Input()
    label: string;
    @Input()
    id: string;
    @Input()
    validatorsErrorsMap: ClrFormFields.FieldValidatorsErrorsMap | undefined;

    //@ts-ignore
    constructor(
        private readonly fb: FormBuilder,
        @Optional()
        @Host()
        @SkipSelf()
        private formGroupDirective: FormGroupDirective,
        private readonly cdr: ChangeDetectorRef
    ) {}

    ngOnInit() {
        if (this.control) {
            // for validator
            this.control.valueChanges
                .pipe(
                    takeUntil(this.destroy$),
                    tap(() => {
                        this.cdr.markForCheck();
                    })
                )
                .subscribe();
            this.control.statusChanges.pipe(tap(x => console.log('+++', x)));
        }
    }

    ngOnDestroy() {
        this.destroy$.next();
    }

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

        console.log(this.control.dirty, this.control.pristine);

        return !errors['required'];
    }

    get control(): FormControl | undefined {
        return this.formGroupDirective && this.id && (this.formGroupDirective.control.controls[this.id] as any);
    }

    get isInvalid() {
        return this.control && this.control.invalid;
    }

}
