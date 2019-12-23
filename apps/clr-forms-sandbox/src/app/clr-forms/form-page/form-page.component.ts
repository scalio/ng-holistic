import { Component } from '@angular/core';
import { TextMask } from '@ng-holistic/clr-controls';
import { ClrFormLayouts } from '@ng-holistic/clr-forms';
// This is for the sample info, ignore it
import * as CONSTANTS from './form-page.consts';

const definition: ClrFormLayouts.ClrFormLayout = {
    kind: 'fields',
    fields: [
        {
            id: 'text',
            kind: 'TextField',
            props: {
                label: 'Text',
                placeholder: 'Type something',
                maxLength: 10,
                warningLimit: 3
            }
        },
        {
            id: 'num',
            kind: 'MaskField',
            props: {
                label: 'Number',
                placeholder: '0000000',
                mask: TextMask.int(7),
                unmask: TextMask.unmaskNumber
            }
        },
        {
            id: 'decNum',
            kind: 'MaskField',
            props: {
                label: 'Decimal number',
                placeholder: '0000000.00',
                mask: TextMask.float(7, 2),
                unmask: TextMask.unmaskNumber
            }
        },
        {
            id: 'phone',
            kind: 'PhoneField',
            label: 'Phone'
        },
        {
            id: 'password',
            kind: 'PasswordField',
            label: 'Password'
        },
        {
            id: 'textarea',
            kind: 'TextAreaField',
            props: {
                label: 'Text Area',
                placeholder: 'Type something'
            }
        },
        {
            id: 'date',
            kind: 'DateField',
            label: 'Date'
        },
        {
            id: 'date-time',
            kind: 'DateTimeField',
            label: 'Date Time'
        },
        {
            id: 'date-range',
            kind: 'DateRangeField',
            label: 'Date Range'
        },
        {
            id: 'moth-year',
            kind: 'MonthYearSelectField',
            label: 'Moth Year'
        },
        {
            id: 'select',
            kind: 'SelectField',
            props: {
                label: 'Select',
                items: [{ key: 'one', label: 'one' }, { key: 'two', label: 'two' }, { key: 'three', label: 'three' }]
            }
        },
        {
            id: 'multiSelect',
            kind: 'MultiSelectField',
            props: {
                label: 'Multi select',
                items: [{ key: 'one', label: 'one' }, { key: 'two', label: 'two' }, { key: 'three', label: 'three' }]
            }
        },
        {
            id: 'toggle',
            kind: 'ToggleField',
            props: {
                label: 'Toggle',
                text: 'Use feature'
            }
        },
        {
            id: 'options',
            kind: 'OptionsField',
            props: {
                label: 'Options',
                items: [{ key: 'opt1', label: 'opt1' }, { key: 'opt2', label: 'opt2' }]
            }
        },
        {
            id: 'checkboxes',
            kind: 'CheckboxesField',
            props: {
                label: 'Checkboxes',
                items: [{ key: 'chk1', label: 'chk1' }, { key: 'chk2', label: 'chk2' }]
            }
        }
    ]
};

@Component({
    selector: 'hlc-form-page',
    templateUrl: './form-page.component.html',
    styleUrls: ['./form-page.component.scss']
})
export class FormPageComponent {
    // This is for the sample info, ignore it
    CONSTANTS = CONSTANTS;
    definition = definition;

    constructor() {}
}
