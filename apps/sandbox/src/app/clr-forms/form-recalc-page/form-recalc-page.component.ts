import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

const group = (form: FormGroup) => ({
    kind: 'fields',
    fields: [
        {
            id: 'select',
            kind: 'SelectField',
            label: 'Select',
            items: [
                { key: '0', label: 'disable text' },
                { key: '1', label: 'set date control value to current date' },
                { key: '2', label: 'make textarea required' }
            ]
        },
        {
            id: 'text',
            kind: 'TextField',
            label: 'Text',
            placeholder: 'Type something',
            readonly: form.valueChanges.pipe(map(({ select }) => select === '0')),
            $validators: [Validators.required]
        },
        {
            id: 'date',
            kind: 'DateField',
            label: 'Date',
            value: form.valueChanges.pipe(map(({ select, date }) => (select === '1' ? '01/02/2015' : date)))
        },
        {
            id: 'textarea',
            kind: 'TextAreaField',
            label: 'Text Area',
            placeholder: 'Type something',
            $validators: form.valueChanges.pipe(map(({ select }) => (select === '2' ? [Validators.required] : [])))
        }
    ]
});

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
