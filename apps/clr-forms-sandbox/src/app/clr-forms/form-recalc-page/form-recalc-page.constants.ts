export const definition = `
const definition = (form: FormGroup): ClrFormLayouts.ClrFormLayout => ({
    kind: 'fields',
    fields: [
        {
            id: 'select',
            kind: 'SelectField',
            props: {
                label: 'Select',
                items: [
                    { key: '0', label: 'disable text' },
                    { key: '1', label: 'set date control value to current date' },
                    { key: '2', label: 'make textarea required' },
                    { key: '3', label: 'hide text' }
                ]
            }
        },
        {
            id: 'text',
            kind: 'TextField',
            props: {
                label: 'Text',
                placeholder: 'Type something',
                readonly: form.valueChanges.pipe(map(({ select }) => select === '0'))
            },
            // it makes sence to remove validators for readOnly state
            validators: form.valueChanges.pipe(map(({ select }) => (select !== '0' ? [Validators.required] : []))),
            validatorsErrorsMap: { required: 'This field is required ' },
            hidden: form.valueChanges.pipe(map(({ select }) => select === '3'))
        },
        {
            id: 'date',
            kind: 'DateField',
            props: {
                label: 'Date'
            },
            value: form.valueChanges.pipe(
                distinctPropChanged('select'),
                map(({ select, date }) => {
                    // tslint:disable-next-line:quotemark
                    return select === '1' ? format("yyyy-MM-dd'T'HH:mm:ss", new Date()) : date;
                })
            )
        },
        {
            id: 'textarea',
            kind: 'TextAreaField',
            props: {
                label: 'Text Area',
                placeholder: 'Type something'
            },
            validators: form.valueChanges.pipe(map(({ select }) => (select === '2' ? [Validators.required] : [])))
        }
    ]
});
`;

export const srcUrl =
    'https://stackblitz.com/edit/hlc-clr-form-recalc?embed=1&file=src/app/app.component.ts&view=editor';
