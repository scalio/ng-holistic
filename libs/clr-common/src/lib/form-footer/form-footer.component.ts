import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Inject,
    InjectionToken,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import * as R from 'ramda';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

export interface FormFooterLabels {
    okLabel: string;
    cancelLabel: string;
}

export interface FormFooterConfig {
    labels: FormFooterLabels;
}

export const HLC_CLR_FORM_FOOTER_CONFIG = new InjectionToken<FormFooterConfig>('HLC_CLR_FORM_FOOTER_CONFIG');

const defaultLabels: FormFooterLabels = {
    okLabel: 'Update',
    cancelLabel: 'Cancel'
};

export interface FormFooterDataAccess {
    /**
     * Emits after each update success
     */
    updateSuccess$?: Subject<any>;
    update(data: any): Observable<any>;
}

@Component({
    selector: 'hlc-clr-form-footer',
    templateUrl: './form-footer.component.html',
    styleUrls: ['./form-footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFooterComponent implements OnInit, OnDestroy {
    error: string | null;
    originalValue: any;
    updateButtonState$ = new BehaviorSubject(ClrLoadingState.DEFAULT);
    private destroy$ = new Subject();

    form: FormGroup;
    @Input('form') set setForm(val: FormGroup) {
        this.destroy$.next();
        this.form = val;
        if (this.form) {
            this.originalValue = this.form.value;
            this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
                this.cdr.markForCheck();
            });
        }
    }

    @Input() displayError = true;
    @Input() okLabel: string | undefined;
    @Input() cancelLabel: string | undefined;
    @Input() dataAccess: FormFooterDataAccess | undefined;
    @Input() disabled: boolean | undefined;

    @Output() save = new EventEmitter();
    @Output() cancel = new EventEmitter();
    @Output() dataAccessError = new EventEmitter<string>();

    constructor(
        private readonly cdr: ChangeDetectorRef,
        @Optional() @Inject(HLC_CLR_FORM_FOOTER_CONFIG) private readonly config: FormFooterConfig
    ) {}

    ngOnInit() {}

    ngOnDestroy() {
        this.destroy$.next();
    }

    get labels() {
        return R.mergeDeepRight((this.config && this.config.labels) || defaultLabels, {
            okLabel: this.okLabel,
            cancelLabel: this.cancelLabel
        });
    }

    get isFormEnabled() {
        return this.form && this.form.valid && this.form.dirty;
    }

    onSave() {
        this.error = null;
        this.save.emit();
        if (this.dataAccess) {
            this.updateButtonState$.next(ClrLoadingState.LOADING);
            this.dataAccess
                .update(this.form.value)
                .pipe(
                    take(1),
                    takeUntil(this.destroy$)
                )
                .subscribe(
                    _ => {
                        this.updateButtonState$.next(ClrLoadingState.SUCCESS);
                        this.form.reset(this.form.value);
                        this.originalValue = this.form.value;
                        if (this.dataAccess && this.dataAccess.updateSuccess$) {
                            this.dataAccess.updateSuccess$.next(this.form.value);
                        }
                    },
                    err => {
                        this.updateButtonState$.next(ClrLoadingState.ERROR);
                        this.error = err;
                        this.dataAccessError.emit(err);
                    }
                );
        }
    }

    onCancel() {
        this.onResetError();
        this.form.reset(this.originalValue);
        this.cancel.emit();
    }

    onResetError() {
        this.error = null;
    }
}
