import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { createDepFieldsMapFromValidation, FormFields, updateDepFieldsValidation } from '@ng-holistic/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'hlc-fields-layout',
    templateUrl: './fields-layout.component.html',
    styleUrls: ['./fields-layout.component.scss']
})
export class FieldsLayoutComponent implements OnInit, OnDestroy {
    @Input() formGroup: FormGroup;

    @Input() items: FormFields.FormField[];

    private destroy$ = new Subject();

    constructor() {}

    ngOnInit() {
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
