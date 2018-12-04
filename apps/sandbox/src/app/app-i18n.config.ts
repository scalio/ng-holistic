import { LOCALE_ID } from '@angular/core';
import { DateConfig, DATE_CONFIG } from '@ng-holistic/clr-controls';
import {
    InputContainerConfig,
    INPUT_CONTAINER_CONFIG,
    ValidationErrorsMapConfig,
    VALIDATION_ERRORS_MAP_CONFIG
} from '@ng-holistic/clr-forms';

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

export function getValidationErrorsMap(localeId: string): ValidationErrorsMapConfig {
    if (localeId !== 'ru') {
        return {
            required(container) {
                return `Field ${container.label} is required`;
            }
        };
    } else {
        return {
            required(container) {
                return `Поле ${container.label} обязательно для заполнения`;
            }
        };
    }
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
    },
    {
        provide: VALIDATION_ERRORS_MAP_CONFIG,
        useFactory: getValidationErrorsMap,
        deps: [LOCALE_ID]
    }
];
