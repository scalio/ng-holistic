import { InjectionToken } from '@angular/core';

export interface WizardConfigButtonsText {
    cancel: string;
    next: string;
    back: string;
    finish: string;
    skip: string;
}

export interface WizardConfig {
    buttonsText: WizardConfigButtonsText;
}

export const defaultWizardConfig: WizardConfig = {
    buttonsText: {
        cancel: 'Cancel',
        next: 'Next',
        back: 'Back',
        finish: 'Finish',
        skip: 'Skip'
    }
};

export const HLC_CLR_WIZARD_CONFIG = new InjectionToken<WizardConfig>('HLC_CLR_WIZARD_CONFIG');
