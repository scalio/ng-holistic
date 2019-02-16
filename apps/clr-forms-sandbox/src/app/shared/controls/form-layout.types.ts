import { RemoveFileFun, UploadFileFun } from '@ng-holistic/clr-file-upload';
import { ClrFormFields, ClrFormLayouts } from '@ng-holistic/clr-forms';
import { FormFields } from '@ng-holistic/forms';

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

    export interface DocumentUploadField extends ClrFormFields.BaseField<'DocumentUploadField'> {}

    type FormField = RichTextField | ImageUploadField | DocumentUploadField;

    export type FormLayout = ClrFormLayouts.ClrFormLayout<FormField>;
}
