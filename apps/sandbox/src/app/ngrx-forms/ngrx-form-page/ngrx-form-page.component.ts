import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormLayout } from '@ng-holistic/forms';
import { TextMask } from '@ng-holistic/clr-controls';

const config: FormLayout.Form = {
    content: {
        kind: 'FormFieldsCollection',
        items: [
            {
                kind: 'TextField',
                id: 'title',
                label: 'Title'
            },
            {
                kind: 'DateField',
                id: 'date',
                label: 'Date'
            },
            {
                kind: 'SelectField',
                id: 'items',
                label: 'Items',
                items: [
                    {
                        key: 'one',
                        label: 'one'
                    },
                    {
                        key: 'two',
                        label: 'two'
                    }
                ]
            },
            {
                kind: 'TextareaField',
                id: 'textarea',
                label: 'Textarea'
            },
            {
                kind: 'MaskField',
                id: 'mask',
                label: 'Number',
                mask: TextMask.int(3),
                unmask: TextMask.unmaskNumber
            }
        ]
    }
};

@Component({
    selector: 'hlc-ngrx-form-page',
    templateUrl: './ngrx-form-page.component.html',
    styleUrls: ['./ngrx-form-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgrxFormPageComponent implements OnInit {
    config = config;

    constructor() {}

    ngOnInit() {}
}
