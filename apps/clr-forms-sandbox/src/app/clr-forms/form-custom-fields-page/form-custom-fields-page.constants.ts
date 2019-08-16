export const definition = `
const definition: ClrFormLayouts.ClrFormLayout = {
    kind: 'fields',
    fields: [
        {
            id: 'custom',
            kind: 'CustomField'
        },
        {
            id: 'customControl',
            kind: 'CustomField',
            /**
             * Will sync value changes of first component inside custom
             * field template container with form value
             */
            valueAccessor: 'self'
        },
        {
            id: 'customWrappedControl',
            kind: 'CustomField',
            /**
             * Will sync value changes of first component's first child
             * inside custom field template container (this is most common case wrapper -> input)
             * with form value
             */
            valueAccessor: 'first-child',
            validators: [Validators.required]
        }
    ]
};
`;

export const srcUrl =
    'https://stackblitz.com/edit/hlc-clr-form-custom-fields?embed=1&file=src/app/app.component.ts&view=editor';