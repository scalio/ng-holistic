import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ClrFormFields, ClrFormLayouts } from '@ng-holistic/clr-forms';

@Component({
    selector: 'hlc-clr-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OnInit {
    @Input() fields: ClrFormFields.FormField[];

    get group() {
        return this.fields && {
            kind: 'fields',
            fields: this.fields
        } as ClrFormLayouts.FieldsLayout;
    }

    constructor() {}

    ngOnInit() {}
}
