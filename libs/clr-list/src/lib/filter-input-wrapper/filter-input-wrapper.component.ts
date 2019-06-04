import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Host,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    SkipSelf
} from '@angular/core';
import { FormControl, FormGroupDirective } from '@angular/forms';
import { ClrFormFields, VALIDATION_ERRORS_MAP_CONFIG } from '@ng-holistic/clr-forms';
import * as R from 'ramda';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'hlc-clr-filter-input-wrapper',
    templateUrl: './filter-input-wrapper.component.html',
    styleUrls: ['./filter-input-wrapper.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HlcClrFilterInputWrapperComponent implements OnInit, OnDestroy {
    readonly destroy$ = new Subject();

    @Input() id: string;
    @Input() label: string;
    @Input()
    validatorsErrorsMap: ClrFormFields.FieldValidatorsErrorsMap | undefined;

    constructor(
        private readonly cdr: ChangeDetectorRef,
        @Optional()
        @Host()
        @SkipSelf()
        private formGroupDirective: FormGroupDirective,
        @Optional()
        @Inject(VALIDATION_ERRORS_MAP_CONFIG)
        private readonly validationErrorsMapConfig?: any // build issue ValidationErrorsMapConfig
    ) {}

    ngOnInit() {
        // container is not checked when child changed
        if (this.control) {
            this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.cdr.markForCheck());
        }
    }

    ngOnDestroy() {
        this.destroy$.next();
    }

    get control(): FormControl | undefined {
        return this.formGroupDirective && this.id && (this.formGroupDirective.control.controls[this.id] as any);
    }

    get error() {
        return this.control && this.control.errors && this.control.errors[0];
    }

    /**
     * Get error text from `container.validatorsErrorsMap` or global config `ValidationErrorsMapConfig`
     * @param validationName
     */
    private getErrorTextFromMap(validationName: string): string | undefined {
        const err = R.propOr(undefined, validationName, this.validatorsErrorsMap);

        if (err) {
            return err as unknown as string;
        }

        const validation = this.validationErrorsMapConfig && this.validationErrorsMapConfig[validationName];

        if (validation) {
            return typeof validation === 'string' ? validation : undefined;
        }

        return validationName;
    }

    get validationErrors(): string[] {
        const control = this.control;

        if (!control) {
            return [];
        }

        const errors = control.errors;

        if (!errors) {
            return [];
        }
        return R.pipe(
            R.toPairs,
            R.map(([k]) => this.getErrorTextFromMap(k))
        )(errors) as any;
    }

    //trackBy

    trackByError(index: any) {
        return index;
    }
}
