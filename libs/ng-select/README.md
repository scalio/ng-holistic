# NgSelect

Simple wrapper around [ng-select](https://github.com/ng-select/ng-select), intended to align look and feel plus some common behavior for ng-holistic.

use with
`@import "~@ng-select/ng-select/themes/default.theme.css";`

Requires `ng-select` as peer dependency

You may want to add this field to you layout definition type

```
    export interface NgSelectField
        extends ClrFormFields.BaseField<
            'NgSelectField',
            string,
            {
                placeholder?: FormFields.FormFieldProp<any>;
                items?: FormFields.FormFieldProp<any>;
                typeaheadFun?: (term$: Observable<string>) => Observable<any[]>;
            }
        > {}
```