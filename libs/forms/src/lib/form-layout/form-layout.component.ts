import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { IFormGroup } from '../models';

@Component({
    selector: 'hlc-form-layout',
    templateUrl: './form-layout.component.html',
    styleUrls: ['./form-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormLayoutComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject();
    form: FormGroup;
    @Input() group: IFormGroup<any> | undefined;
    /*
    private _tempVal: any;

    @Input()
    set value(val: any) {
        if (this.form) {
            this.form.patchValue(val);
        } else {
            this._tempVal = val;
        }
    }
    */

    // constructor(private readonly fb: FormBuilder, private readonly cdr: ChangeDetectorRef) {}

    ngOnInit() {
        if (!this.group) {
            return;
        }

        /*
        this.form = buildForm(this.fb, flatForm(this.groups));

        if (this._tempVal) {
            this.form.patchValue(this._tempVal);
            this._tempVal = undefined;
        }

        this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.cdr.detectChanges());
        */
    }

    ngOnDestroy() {
        this.destroy$.next();
    }

    /*
    get fields() {
        return this.groups && this.groups.content.kind === 'FormFieldsCollection' ? this.groups.content.items : null;
    }

    get groups() {
        return this.groups && this.groups.content.kind === 'FormGroupsCollection' ? this.groups.content.items : null;
    }

    get tabs() {
        return this.groups && this.groups.content.kind === 'FormTabsCollection' ? this.groups.content.items : null;
    }
    */
}
