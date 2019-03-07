import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Host,
    Inject,
    InjectionToken,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    SkipSelf
} from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ClrFormFields } from '../models/form-fields.types';
import { InputErrorDisplayStartegy } from './input-error-display-strategy';

export interface InputContainerConfig {
    optionalLabel?: string;
    requiredLabel?: string;
    showRequiredHint?: 'optional' | 'required';
}

export const INPUT_CONTAINER_CONFIG = new InjectionToken<InputContainerConfig>('INPUT_CONTAINER_CONFIG');

@Component({
    selector: 'hlc-clr-input-container',
    templateUrl: './input-container.component.html',
    styleUrls: ['./input-container.component.scss']
})
export class HlcClrInputContainerComponent implements OnInit, OnDestroy {
    private readonly destroy$ = new Subject();

    @Input()
    label: string;
    @Input()
    id: string;
    @Input()
    validatorsErrorsMap: ClrFormFields.FieldValidatorsErrorsMap | undefined;
    @Input()
    readonly: boolean;

    @Input()
    formControl: FormControl;

    @Output() labelClick = new EventEmitter();

    // @ts-ignore
    constructor(
        private readonly fb: FormBuilder,
        @Optional()
        @Host()
        @SkipSelf()
        private formGroupDirective: FormGroupDirective,
        private readonly cdr: ChangeDetectorRef,
        @Optional() private readonly strategy?: InputErrorDisplayStartegy,
        @Optional() @Inject(INPUT_CONTAINER_CONFIG) private readonly config?: InputContainerConfig
    ) {}

    get requiredLabel() {
        return (this.config && this.config.requiredLabel) || '*';
    }

    get optinalLabel() {
        return (this.config && this.config.optionalLabel) || 'Optional';
    }

    get showRequiredHint() {
        return this.config && this.config.showRequiredHint;
    }

    //

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
        if (!this.control || this.readonly) {
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

    get isRequired() {
        if (!this.control || this.readonly) {
            return false;
        }

        return !this.isOptional;
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

        if (this.strategy) {
            if (this.strategy.shouldDisplayError(this.control)) {
                return this.control.invalid;
            } else {
                return false;
            }
        }

        return this.control.invalid;
    }

    onLabelClick() {
        this.labelClick.emit();
    }
}
