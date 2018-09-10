import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
    createDepFieldsMapFromValidation,
    FormFields,
    mapFieldsToView,
    updateDepFieldsValidation
} from '@ng-holistic/forms';
import { Dicts } from '@ng-holistic/ngrx-forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'hlc-fields-layout',
    templateUrl: './fields-layout.component.html',
    styleUrls: ['./fields-layout.component.scss']
})
export class FieldsLayoutComponent implements OnInit, OnDestroy {
    @Input() formGroup: FormGroup;
    @Input() dicts: Dicts;

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

    get itemsView() {
        return mapFieldsToView(this.dicts, this.items);
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
