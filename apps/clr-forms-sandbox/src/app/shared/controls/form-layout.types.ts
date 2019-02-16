import { ClrFormFields, ClrFormLayouts } from '@ng-holistic/clr-forms';
import { FormFields } from '@ng-holistic/forms';

export namespace FormLayouts {
    export interface RichTextField
        extends ClrFormFields.BaseFieldP<
            'RichTextField',
            string,
            { style?: FormFields.FormFieldProp<{ [key: string]: any }> }
        > {}

    export interface ImageUploadField extends ClrFormFields.BaseField<'ImageUploadField'> {}

    type FormField = RichTextField | ImageUploadField;
    export type FormLayout = ClrFormLayouts.ClrFormLayout<FormField>;
}
