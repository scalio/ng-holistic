import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

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
    selector: 'hlc-form-page',
    templateUrl: './form-page.component.html',
    styleUrls: ['./form-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormPageComponent implements OnInit {
    fields = fields;

    constructor() {}

    ngOnInit() {}
}
