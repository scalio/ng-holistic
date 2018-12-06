import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

export interface DataAccess {
    update(data: any): Observable<any>;
}

@Component({
    selector: 'hlc-clr-form-footer',
    templateUrl: './form-footer.component.html',
    styleUrls: ['./form-footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFooterComponent implements OnInit, OnDestroy {
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

    @Output() save = new EventEmitter();
    @Output() cancel = new EventEmitter();

    @Input() dataAccess: DataAccess | undefined;
    @Input() isNew: boolean | undefined;
    @Input() disabled: boolean | undefined;

    constructor(private readonly cdr: ChangeDetectorRef) {}

    ngOnInit() {}

    ngOnDestroy() {
        this.destroy$.next();
    }

    get isFormEnabled() {
        return this.form && this.form.valid && this.form.dirty;
    }

    onSave() {
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
                    },
                    _ => {
                        this.updateButtonState$.next(ClrLoadingState.ERROR);
                    }
                );
        }
    }

    onCancel() {
        this.form.reset(this.originalValue);
        this.cancel.emit();
    }
}
