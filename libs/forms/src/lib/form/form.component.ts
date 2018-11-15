import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    forwardRef,
    Inject,
    Input,
    OnDestroy,
    OnInit
} from '@angular/core';
import { QueryList } from '@angular/core/src/render3';
import { FormBuilder, FormGroup } from '@angular/forms';
import { equals } from 'ramda';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CustomFieldsProvider, HLC_FORM_CUSTOM_FIELDS_PROVIDER } from '../fields-layout';
import { CustomFieldDirective } from '../fields-layout/custom-field.directive';
import { ExtractFieldsFun, HLC_FORM_EXTRACT_FIELDS } from '../form-extract-fields';
import { IFormGroup } from '../models';
import { initFormGroup } from './form-builder';

export type FormLayoutConfig = IFormGroup<any> | ((formGroup: FormGroup) => IFormGroup<any>);

@Component({
    selector: 'hlc-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: HLC_FORM_CUSTOM_FIELDS_PROVIDER,
            useExisting: forwardRef(() => FormComponent)
        }
    ]
})
export class FormComponent implements OnInit, OnDestroy, AfterViewInit, CustomFieldsProvider {
    private destroy$ = new Subject();
    private _tempVal: any;
    group: IFormGroup<any> | undefined;
    @Input('group')
    set setGroup(val: FormLayoutConfig | undefined) {
        this.initForm(val);
    }
    @Input()
    set value(val: any) {
        if (this.formGroup) {
            if (equals(this.formGroup.value, val)) {
                return;
            }

            this.formGroup.patchValue(val);
            this.formGroup.updateValueAndValidity({ onlySelf: false, emitEvent: true });
            this.cdr.detectChanges();
        } else {
            this._tempVal = val;
        }
    }
    @Input()
    customFields: QueryList<CustomFieldDirective> | undefined;

    formGroup: FormGroup;

    constructor(
        private readonly fb: FormBuilder,
        private readonly cdr: ChangeDetectorRef,
        @Inject(HLC_FORM_EXTRACT_FIELDS) private readonly extractFieldsFun: ExtractFieldsFun
    ) {}

    ngOnInit() {}

    private initForm(form: FormLayoutConfig | undefined) {
        if (!form) {
            this.group = undefined;
            this.destroy$.next();
            return;
        }

        const newFormGroup = this.fb.group({});

        const newForm = typeof form === 'function' ? form(newFormGroup) : form;

        if (this.group === newForm) {
            // Same form as before
            return;
        }

        this.destroy$.next();

        this.formGroup = newFormGroup;
        this.group = newForm;

        const fields = this.extractFieldsFun(this.group);

        const sniffer$ = initFormGroup(this.formGroup, this.fb, fields);

        if (this._tempVal) {
            this.formGroup.patchValue(this._tempVal);
            this._tempVal = undefined;
        }

        if (sniffer$) {
            sniffer$.pipe(takeUntil(this.destroy$)).subscribe(() => {});
        }
    }

    ngAfterViewInit() {
        // Allow value subscribers of form take initial actions
        this.formGroup.updateValueAndValidity({ onlySelf: false, emitEvent: true });
        this.cdr.detectChanges();
    }

    ngOnDestroy() {
        this.destroy$.next();
    }
}
