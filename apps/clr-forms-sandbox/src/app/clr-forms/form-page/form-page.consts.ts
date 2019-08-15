export const definition = `
const definition: FormLayouts.FormLayout = {
    kind: 'fields',
    fields: [
        {
            id: 'text',
            kind: 'TextField',
            props: {
                label: 'Text',
                placeholder: 'Type something'
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

`;

export const srcUrl = 'https://stackblitz.com/edit/hlc-clr-form?embed=1&file=src/app/app.component.ts&view=editor';
