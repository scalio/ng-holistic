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
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

export interface FormFooterLabels {
    okLabel: string;
    cancelLabel: string;
}

export interface FormFooterConfig {
    labels: FormFooterLabels;
}

export const HLC_FORM_FOOTER_CONFIG = new InjectionToken<FormFooterConfig>('HLC_CLR_FORM_FOOTER_CONFIG');

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

export interface FormController {
    save$: Observable<any>;
    cancel$: Observable<any>;
}

export const HLC_FORM_CONTROLLER = new InjectionToken<FormController>('HLC_FORM_CONTROLLER');

@Component({
    selector: 'hlc-clr-form-footer',
    templateUrl: './form-footer.component.html',
    styleUrls: ['./form-footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HlcClrFormFooterComponent implements OnInit, OnDestroy {
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
            this.startListenKeys();
        }
    }

    @Input() displayError = true;
    @Input() okLabel: string | undefined;
    @Input() cancelLabel: string | undefined;
    @Input() dataAccess: FormFooterDataAccess | undefined;
    @Input() disabled: boolean | undefined;
    @Input() allowOkWhenFormPristine = false;
    @Input() footerClass = 'form-footer';
    @Input() reverseButtons = false;

    @Output() save = new EventEmitter();
    @Output() cancel = new EventEmitter();
    @Output() dataAccessError = new EventEmitter<string>();

    constructor(
        private readonly cdr: ChangeDetectorRef,
        @Optional() @Inject(HLC_FORM_FOOTER_CONFIG) private readonly config: FormFooterConfig,
        @Optional() @Inject(HLC_FORM_CONTROLLER) private readonly formController?: FormController
    ) {}

    ngOnInit() {}

    ngOnDestroy() {
        this.destroy$.next();
    }

    get labels() {
        const labels = (this.config && this.config.labels) || defaultLabels;
        return {
            okLabel: this.okLabel || labels.okLabel,
            cancelLabel: this.cancelLabel || labels.cancelLabel
        };
    }

    get isFormEnabled() {
        return this.form && this.form.valid && (this.allowOkWhenFormPristine || this.form.dirty);
    }

    onSave() {
        // Need this check here if onSave was invoked by hotkeys
        const updateState = this.updateButtonState$.getValue();
        if (!this.form || !this.form.valid || updateState === ClrLoadingState.LOADING) {
            return;
        }
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
        if (this.form) {
            this.form.reset(this.originalValue);
        }
        this.cancel.emit();
    }

    onResetError() {
        this.error = null;
    }

    private startListenKeys() {
        if (this.formController) {
            this.formController.save$.pipe(takeUntil(this.destroy$)).subscribe(() => this.onSave());
            this.formController.cancel$.pipe(takeUntil(this.destroy$)).subscribe(() => this.onCancel());
        }
    }
}
