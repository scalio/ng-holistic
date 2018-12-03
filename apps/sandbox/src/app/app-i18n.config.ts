import { LOCALE_ID } from '@angular/core';
import { DateConfig, DATE_CONFIG } from '@ng-holistic/clr-controls';
import { InputContainerConfig, INPUT_CONTAINER_CONFIG } from '@ng-holistic/clr-forms';

export function getInputContainerConfig(localeId: string): InputContainerConfig {
    /**
     * When application build with i18n-locale=ru all input optional hints will be in correct format
     */
    return {
        optionalLabel: localeId === 'ru' ? 'Опционально' : undefined
    };
}

export function getDateConfig(localeId: string): DateConfig {
    /**
     * When application build with i18n-locale=ru all date components placeholders will have in correct format
     */
    return {
        // for ru locale use specific date placeholder
        placeholder: localeId === 'ru' ? 'ДД.ММ.ГГГГ' : undefined
    };
}

export const i18nConfigProviders = [
    {
        provide: DATE_CONFIG,
        useFactory: getDateConfig,
        deps: [LOCALE_ID]
    },
    {
        provide: INPUT_CONTAINER_CONFIG,
        useFactory: getInputContainerConfig,
        deps: [LOCALE_ID]
    }
];
