import { ChangeDetectionStrategy, Component } from '@angular/core';

const group = {
    kind: 'fields',
    fields: [
        {
            id: 'select',
            kind: 'SelectField',
            label: 'Select',
            items: [
                { key: '0', label: 'disable text' },
                { key: '1', label: 'enable text' },
                { key: '2', label: 'set date control value to current date' },
                { key: '3', label: 'make textarea required' },
            ]
        },
        {
            id: 'text',
            kind: 'TextField',
            label: 'Text',
            placeholder: 'Type something'
        },
        {
            id: 'date',
            kind: 'DateField',
            label: 'Date'
        },
        {
            id: 'textarea',
            kind: 'TextAreaField',
            label: 'Text Area',
            placeholder: 'Type something'
        },
    ]
};

@Component({
    selector: 'hlc-form-recalc-page',
    templateUrl: './form-recalc-page.component.html',
    styleUrls: ['./form-recalc-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormRecalcPageComponent {
    group = group;

    constructor() {}
}
