import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { format } from 'date-fns/esm/fp';
import { ClrFormLayouts } from '@ng-holistic/clr-forms';

const group = (form: FormGroup): ClrFormLayouts.ClrFormLayout => ({
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
            $validators: [Validators.required],
            validatorsErrorsMap: { required : 'This field is required '}
        },
        {
            id: 'date',
            kind: 'DateField',
            label: 'Date',
            value: form.valueChanges.pipe(
                // tslint:disable-next-line:quotemark
                map(({ select, date }) => (select === '1' ? format("yyyy-MM-dd'T'HH:mm:ss", new Date()) : date))
            )
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
