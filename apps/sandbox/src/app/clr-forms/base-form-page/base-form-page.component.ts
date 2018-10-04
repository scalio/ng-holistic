import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

const fields = [
    {
        kind: 'TextField',
        id: 'text',
        placeholder: 'Type something'
    },
    {
        kind: 'TextAreaField',
        id: 'textarea',
        placeholder: 'Type something'
    },
    {
        kind: 'DateField',
        id: 'date'
    },
    {
        kind: 'SelectField',
        id: 'select',
        items: [{ key: 'one', label: 'one' }, { key: 'two', label: 'two' }]
    }
];

@Component({
    selector: 'hlc-base-form-page',
    templateUrl: './base-form-page.component.html',
    styleUrls: ['./base-form-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseFormPageComponent implements OnInit {
    fields = fields;
    formGroup: FormGroup;

    constructor(fb: FormBuilder) {
        this.formGroup = fb.group({
            text: [''],
            textarea: [''],
            date: [null],
            select: [null]
        });
    }

    ngOnInit() {}
}
