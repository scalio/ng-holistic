import { RemoveFileFun, UploadFileFun } from '@ng-holistic/clr-file-upload';
import { ClrFormFields, ClrFormLayouts } from '@ng-holistic/clr-forms';
import { FormFields } from '@ng-holistic/forms';
import { Observable } from 'rxjs';

export namespace FormLayouts {
    export interface RichTextField
        extends ClrFormFields.BaseFieldP<
            'RichTextField',
            string,
            { style?: FormFields.FormFieldProp<{ [key: string]: any }> }
        > {}

    export interface ImageUploadField
        extends ClrFormFields.BaseField<
            'ImageUploadField',
            any,
            {
                uploadFileFun?: FormFields.FormFieldProp<UploadFileFun>;
                removeFileFun?: FormFields.FormFieldProp<RemoveFileFun>;
            }
        > {}

    export interface DocumentUploadField
        extends ClrFormFields.BaseField<
            'DocumentUploadField',
            string,
            {
                accept?: FormFields.FormFieldProp<string>;
            }
        > {}

    export interface NgSelectField
        extends ClrFormFields.BaseField<
            'NgSelectField',
            string,
            {
                placeholder?: FormFields.FormFieldProp<any>;
                items?: FormFields.FormFieldProp<any>;
                typeaheadFun?: (term$: Observable<string>) => Observable<any[]>;
                multiple?: boolean;
            }
        > {}

    type FormField = RichTextField | ImageUploadField | DocumentUploadField | NgSelectField;

    export type FormLayout = ClrFormLayouts.ClrFormLayout<FormField>;
}
