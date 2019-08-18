export const definition = `
const definition: ClrFormLayouts.ClrFormLayout = {
    kind: 'fields',
    fields: [
        {
            id: 'text',
            kind: 'TextField',
            props: {
                label: 'Text',
                placeholder: 'Type something'
            },
            validators: [Validators.required]
        }
    ]
};
`;

export const srcUrl =
    'https://stackblitz.com/edit/hlc-clr-form-error-display-strategy?embed=1&file=src/app/app.module.ts&view=editor';
