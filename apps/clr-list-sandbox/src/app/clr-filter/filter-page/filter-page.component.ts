import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ClrFormFields } from '@ng-holistic/clr-forms';

const fields: ClrFormFields.FormField[] = [
    {
        id: 'text',
        kind: 'TextField',
        props: {
            label: 'Text',
            placeholder: 'Type something'
        },
        validators: [Validators.required]
    },
    {
        id: 'select',
        kind: 'SelectField',
        props: {
            label: 'Select',
            items: [{ key: 1, label: 'one' }, { key: 2, label: 'two' }]
        }
    },
    {
        id: 'date',
        kind: 'DateField',
        label: 'Date'
    },
    {
        id: 'dateRange',
        kind: 'DateRangeField',
        label: 'Date Range'
    }
];
@Component({
    selector: 'hlc-clr-sandbox-filter-page',
    templateUrl: './filter-page.component.html',
    styleUrls: ['./filter-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterPageComponent implements OnInit {
    fields = fields;

    constructor() {}

    ngOnInit() {}
}
