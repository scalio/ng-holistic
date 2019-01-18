import { ClrFormFields } from '@ng-holistic/clr-forms';
import { FormFields } from '@ng-holistic/forms';
import { Observable } from 'rxjs';

export namespace HlcClrWizard {
    export interface WizardStepLayout<T = never> {
        title: FormFields.FormFieldProp<string>;
        navTitle: FormFields.FormFieldProp<string>;
        fields: (ClrFormFields.FormField | T)[];
        commit?: (vals: any[]) => Observable<any>;
        skip?: (vals: any[]) => boolean;
    }
}
