import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { InputContainerComponent } from '@ng-holistic/clr-forms';
import { HLC_FORM_FIELD_WRAPPER } from '@ng-holistic/forms';

const fields = [
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
        readonly: true
    },
    {
        id: 'select',
        kind: 'SelectField',
        label: 'Select',
        items: [{ key: 'one', label: 'one' }, { key: 'two', label: 'two' }]
    }
];

@Component({
    selector: 'hlc-form-layout-page',
    templateUrl: './form-layout-page.component.html',
    styleUrls: ['./form-layout-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: HLC_FORM_FIELD_WRAPPER, useValue: InputContainerComponent }]
})
export class WrappedFiedlsLayoutComponent implements OnInit {
    fields = fields;

    constructor() {}

    ngOnInit() {}
}
