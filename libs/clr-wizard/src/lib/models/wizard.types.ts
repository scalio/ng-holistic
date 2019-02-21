import { ClrFormFields } from '@ng-holistic/clr-forms';
import { FormFields } from '@ng-holistic/forms';
import { Observable } from 'rxjs';

export namespace HlcClrWizard {
    export interface Button {
        text: string;
    }

    export interface PageButtons {
        finish?: Button;
        reset?: Button;
    }

    export interface WizardStepBaseLayout {
        id: string;
        title: FormFields.FormFieldProp<string>;
        navTitle: FormFields.FormFieldProp<string>;
        commit?: (vals: { [key: string]: any }) => Observable<any>;
        skip?: (vals: { [key: string]: any }) => boolean;
        buttons?: PageButtons;
        // User can skip this step by clicking next button
        canSkip?: boolean;
    }

    export interface WizardStepFormLayout<T = never> extends WizardStepBaseLayout {
        fields: (ClrFormFields.FormField | T)[];
    }

    export interface WizardStepCustomLayout extends WizardStepBaseLayout {
        context?: () => any | any;
    }

    export type WizardStepLayout<T = never> = WizardStepFormLayout<T> | WizardStepCustomLayout;
}
