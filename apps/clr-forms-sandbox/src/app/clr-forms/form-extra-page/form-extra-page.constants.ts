
export const definition = `
// Bellow stub functions to demotrate functionality

const uploadFileFun = (file: File) =>
    timer(1000).pipe(mapTo({ id: file.name, name: file.name, src: 'https://pbs.twimg.com/media/DuEkvqTW0AIlTSo.jpg' }));

const removeFileFun = (file: File) => timer(1000).pipe(mapTo({ id: file.name, name: file.name }));

const typeaheadFun = (term$: Observable<string>) =>
    concat(
        of([]), // default items
        term$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            switchMap(term =>
                of(
                    [{ key: 'one', label: 'one' }, { key: 'two', label: 'two' }].filter(
                        item => !term || item.label.startsWith(term)
                    )
                )
            )
        )
    );
    
const definition: FormLayouts.FormLayout = {
    kind: 'fields',
    fields: [
        {
            id: 'ng-select',
            kind: 'NgSelectField',
            props: {
                placeholder: 'Select one...',
                label: 'Select',
                multiple: true,
                typeaheadFun 
            }
        },
        {
            id: 'docUpload',
            kind: 'DocumentUploadField',
            props: {
                label: 'Document upload',
                accept: '.doc, .docx, .pdf'
            }
        },
        {
            id: 'richText',
            kind: 'RichTextField',
            props: {
                label: 'Rich text',
                placeholder: 'Type something',
                style: { height: '150px' }
            }
        },
        {
            id: 'image',
            kind: 'ImageUploadField',
            props: {
                label: 'Image'
            }
        },
        {
            id: 'imageUpload',
            kind: 'ImageUploadField',
            props: {
                label: 'Image with upload',
                uploadFileFun,
                removeFileFun
            }
        }
    ]
};
`;


export const srcUrl = 
    'https://stackblitz.com/edit/hlc-clr-form-extra?embed=1&file=src/app/app.component.ts&view=editor';