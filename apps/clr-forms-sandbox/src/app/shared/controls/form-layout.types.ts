import { ClrFormFields, ClrFormLayouts } from '@ng-holistic/clr-forms';

export namespace FormLayouts {
    export interface RichTextField extends ClrFormFields.BaseFieldP<'RichTextField', string> {}

    export type FormLayout = ClrFormLayouts.ClrFormLayout<RichTextField>;
}
