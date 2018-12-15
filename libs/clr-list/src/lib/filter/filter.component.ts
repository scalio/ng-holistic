import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ClrFormFields, ClrFormLayouts } from '@ng-holistic/clr-forms';

@Component({
    selector: 'hlc-clr-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OnInit {

    _fields: ClrFormFields.FormField[];
    group: ClrFormLayouts.FieldsLayout;

    @Input() set fields(val: ClrFormFields.FormField[]) {
        if (val === this._fields) {
            return;
        }
        this._fields = val;
        this.group = this._fields && {
            kind: 'fields',
            fields: this._fields
        } as ClrFormLayouts.FieldsLayout;
    }

    constructor() {}

    ngOnInit() {}
}
