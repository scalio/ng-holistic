import { ClrFormFields } from './form-fields.types';
import { IFormGroup, FormFields } from '@ng-holistic/forms';

export namespace ClrFormLayouts {

    export interface FieldsLayout extends IFormGroup<'fields'> {
        fields: ClrFormFields.FormField[];
    }

    export interface GroupLayout extends IFormGroup<'group', FieldsLayout | TabsLayout> {
        title: FormFields.FormFieldProp<string>;
    }

    export interface TabLayout extends IFormGroup<'tab', FieldsLayout> {
        title: FormFields.FormFieldProp<string>;
    }

    export interface TabsLayout extends IFormGroup<'tabs', TabLayout> {}

    export type ClrFormLayout = FieldsLayout | GroupLayout | TabLayout | TabsLayout;
}
