import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { ClrFormFields, ClrFormLayouts, ClrFormComponent } from '@ng-holistic/clr-forms';

@Component({
    selector: 'hlc-clr-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OnInit {

    _fields: ClrFormFields.FormField[];
    group: ClrFormLayouts.FieldsLayout;

    @Output() filter = new EventEmitter<any>();

    @ViewChild(ClrFormComponent) clrForm: ClrFormComponent;

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

    ngOnInit() {
    }

    get hasChanges() {
        return this.clrForm.form.hasChanges;
    }

    onFilter() {
        this.filter.emit(this.clrForm.form.formGroup.value);
    }

    onReset() {
        this.clrForm.form.resetValue();
        this.filter.emit(this.clrForm.form.formGroup.value);
    }

}
