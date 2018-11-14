import { ChangeDetectorRef, Component, Host, Input, OnDestroy, OnInit, Optional, SkipSelf } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ClrFormFields } from '../models';
import { InputErrorDisplayStartegy } from './input-error-display-strategy';

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

    @Input()
    formControl: FormControl;

    //@ts-ignore
    constructor(
        private readonly fb: FormBuilder,
        @Optional()
        @Host()
        @SkipSelf()
        private formGroupDirective: FormGroupDirective,
        private readonly cdr: ChangeDetectorRef,
        @Optional() private readonly strategy?: InputErrorDisplayStartegy
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

        return !errors['required'];
    }

    get control(): FormControl | undefined {
        // https://github.com/angular/angular/issues/14935
        // If component was created via createEmbeddedView it loose injector context,
        // so formGroupDirective won't be available, this case formControl should be passed directly via input property
        return (
            this.formControl ||
            (this.formGroupDirective && this.id && (this.formGroupDirective.control.controls[this.id] as any))
        );
    }

    get isInvalid() {
        if (!this.control) {
            return false;
        }

        if (this.strategy && this.strategy.shouldDisplayError(this.control)) {
            return this.control.invalid;
        }

        return false;
    }
}
