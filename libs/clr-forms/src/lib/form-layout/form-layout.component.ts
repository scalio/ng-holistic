import { ChangeDetectionStrategy, Component, Input, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { buildForm, flatForm, FormLayout } from '@ng-holistic/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'hlc-form-layout',
    templateUrl: './form-layout.component.html',
    styleUrls: ['./form-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormLayoutComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject();
    @Input() form: FormLayout.Form | undefined;

    formGroup: FormGroup;

    constructor(private readonly fb: FormBuilder, private readonly cdr: ChangeDetectorRef) {}

    ngOnInit() {
        if (!this.form) {
            return;
        }
        this.formGroup = buildForm(this.fb, flatForm(this.form));

        this.formGroup.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.cdr.detectChanges());
    }

    ngOnDestroy() {
        this.destroy$.next();
    }

    get fields() {
        return this.form && this.form.content.kind === 'FormFieldsCollection' ? this.form.content.items : null;
    }

    get groups() {
        return this.form && this.form.content.kind === 'FormGroupsCollection' ? this.form.content.items : null;
    }

    get tabs() {
        return this.form && this.form.content.kind === 'FormTabsCollection' ? this.form.content.items : null;
    }
}
