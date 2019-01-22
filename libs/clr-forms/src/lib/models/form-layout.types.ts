import { FormFields, IFormGroup } from '@ng-holistic/forms';
import { ClrFormFields } from './form-fields.types';

export namespace ClrFormLayouts {
    export interface FieldsLayout<T = never> extends IFormGroup<'fields'> {
        fields: (ClrFormFields.FormField | T)[];
    }

    export interface GroupLayout<T = never> extends IFormGroup<'group', FieldsLayout<T> | TabsLayout<T>> {
        title: FormFields.FormFieldProp<string>;
    }

    export interface TabLayout<T = never> extends IFormGroup<'tab', FieldsLayout<T> | GroupLayout<T>> {
        title: FormFields.FormFieldProp<string>;
    }

    export interface TabsLayout<T = never> extends IFormGroup<'tabs', TabLayout<T>> {}

    export interface WizardStepLayout<T = never> extends IFormGroup<'wizard-step', FieldsLayout<T> | GroupLayout<T>> {
        title: FormFields.FormFieldProp<string>;
        navTitle: FormFields.FormFieldProp<string>;
    }

    export interface WizardLayout<T = never> extends IFormGroup<'wizard', WizardStepLayout<T>> {
        open: FormFields.FormFieldProp<boolean>;
        title: FormFields.FormFieldProp<string>;
    }

    export type ClrFormLayout<T = never> = FieldsLayout<T> | GroupLayout<T> | TabLayout<T> | TabsLayout<T>;
}
