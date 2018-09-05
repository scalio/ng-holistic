import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormFields, createDepFieldsMapFromValidation, updateDepFieldsValidation, buildForm } from '@ng-holistic/forms';

@Component({
    selector: 'hlc-fields-layout',
    templateUrl: './fields-layout.component.html',
    styleUrls: ['./fields-layout.component.scss']
})
export class FieldsLayoutComponent implements OnInit, OnDestroy {
    formGroup: FormGroup;

    @Input() items: FormFields.FormField[];
    @Input() readonly: boolean;

    private destroy$ = new Subject();

    constructor(private readonly fb: FormBuilder) {
    }

    ngOnInit() {

        this.formGroup = buildForm(this.fb, this.items);

        // build dependent field map from validations
        const depMap = createDepFieldsMapFromValidation(this.items);

        // update dep fields validations
        updateDepFieldsValidation(depMap, this.formGroup)
            .pipe(takeUntil(this.destroy$))
            .subscribe(x => x);
    }

    ngOnDestroy() {
        this.destroy$.next();
    }

    trackByFun(_: number, field: FormFields.FormField) {
        return field.id;
    }

    isJustField(field: FormFields.FormField) {
        return field.kind === 'TextReadonlyField';
    }
}
