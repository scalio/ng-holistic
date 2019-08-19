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
        }
    ]
};

`;

export const srcUrl = 
    'https://stackblitz.com/edit/hlc-clr-form-custom-field-wrapper?embed=1&file=src/app/app.module.ts&view=editor';
