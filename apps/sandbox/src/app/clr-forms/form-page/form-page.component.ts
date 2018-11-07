import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { format } from 'date-fns/esm/fp';
import { ClrFormLayouts } from '@ng-holistic/clr-forms';

const group: ClrFormLayouts.ClrFormLayout = {
    kind: 'fields',
    fields: [
        {
            id: 'text',
            kind: 'TextField',
            label: 'Text',
            placeholder: 'Type something'
        },
        {
            id: 'textarea',
            kind: 'TextAreaField',
            label: 'Text Area',
            placeholder: 'Type something'
        },
        {
            id: 'date',
            kind: 'DateField',
            label: 'Date',
            // tslint:disable-next-line:quotemark
            value: format("yyyy-MM-dd'T'HH:mm:ss", new Date())
        },
        {
            id: 'select',
            kind: 'SelectField',
            label: 'Select',
            items: [{ key: 'one', label: 'one' }, { key: 'two', label: 'two' }]
        }
    ]
};

@Component({
    selector: 'hlc-form-page',
    templateUrl: './form-page.component.html',
    styleUrls: ['./form-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormPageComponent implements OnInit {
    group = group;

    constructor() {}

    ngOnInit() {}
}
