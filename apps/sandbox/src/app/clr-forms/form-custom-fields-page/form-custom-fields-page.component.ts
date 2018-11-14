import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ClrFormLayouts } from '@ng-holistic/clr-forms';

const group: ClrFormLayouts.ClrFormLayout = {
    kind: 'fields',
    fields: [
        {
            id: 'custom',
            kind: 'CustomField'
        },
        {
            id: 'customControl',
            kind: 'CustomField',
            valueAccessor: 'first-child'
        }
    ]
};

@Component({
    selector: 'hlc-form-custom-fields-page',
    templateUrl: './form-custom-fields-page.component.html',
    styleUrls: ['./form-custom-fields-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormCustomFieldsPageComponent implements OnInit {
    group = group;

    constructor() {

    }

    ngOnInit() {}
}
