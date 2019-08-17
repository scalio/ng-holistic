export const definition = `
const rebuildGroup = (
    { tabsCount, groupsCount, fieldsCount }: { tabsCount: number; fieldsCount: number; groupsCount: number },
    _: any
) => (__: FormGroup): ClrFormLayouts.ClrFormLayout => {
    return {
        kind: 'tabs',
        $content: R.range(0, tabsCount).map(t => ({
            kind: 'tab',
            title: \`Tab \${t}\`,
            $content: R.range(0, groupsCount).map(i => ({
                kind: 'group',
                title: \`Group \${i}\`,
                $content: [
                    {
                        kind: 'fields',
                        fields: R.range(0, fieldsCount).map(
                            k =>
                                ({
                                    id: \`\${t}.\${i}.$text.\${k}\`,
                                    kind: 'TextField' as 'TextField',
                                    label: \`Field \${t} \${i} \${k}\`,
                                    validators: [Validators.required]
                                } as FormFields.Field)
                        )
                    }
                ]
            }))
        }))
    } as any;
};
`;

export const srcUrl = 'https://stackblitz.com/edit/hlc-clr-form-dyna?embed=1&file=src/app/app.component.ts&view=editor';
