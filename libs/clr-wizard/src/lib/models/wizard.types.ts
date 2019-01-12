import { ClrFormFields } from '@ng-holistic/clr-forms';
import { FormFields } from '@ng-holistic/forms';

export namespace HlcClrWizard {
    export interface WizardStepLayout<T = never> {
        title: FormFields.FormFieldProp<string>;
        navTitle: FormFields.FormFieldProp<string>;
        fields: (ClrFormFields.FormField | T)[];
    }
}
