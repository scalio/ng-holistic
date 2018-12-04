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
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'hlc-clr-form-footer',
    templateUrl: './form-footer.component.html',
    styleUrls: ['./form-footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFooterComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject();
    form: FormGroup;
    @Input('form') set setForm(val: FormGroup) {
        this.destroy$.next();
        this.form = val;
        if (this.form) {
            this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
                this.cdr.markForCheck();
            });
        }
    }

    @Output() save = new EventEmitter();
    @Output() cancel = new EventEmitter();

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
}
