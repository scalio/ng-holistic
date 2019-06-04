import { LOCALE_ID } from '@angular/core';
import { HlcHotkeysConfigService, HLC_HOTKEYS_CONFIG } from '@ng-holistic/clr-common';
import { DateConfig, DATE_CONFIG } from '@ng-holistic/clr-controls';
import { FileUploadConfig, HLC_CLR_FILE_UPLOAD_CONFIG } from '@ng-holistic/clr-file-upload';
import {
    HlcClrFormLayoutConfigService,
    InputContainerConfig,
    INPUT_CONTAINER_CONFIG,
    ValidationErrorsMapConfig,
    VALIDATION_ERRORS_MAP_CONFIG
} from '@ng-holistic/clr-forms';
import { HLC_FIELDS_LAYOUT_CONFIG } from '@ng-holistic/forms';
import { HLC_NG_SELECT_CONFIG } from '@ng-holistic/ng-select';

export function getInputContainerConfig(localeId: string): InputContainerConfig {
    /**
     * When application build with i18n-locale=ru all input optional hints will be in correct format
     */
    return {
        showRequiredHint: 'optional',
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

export class AppFileUploadConfig implements FileUploadConfig {
    download(_: any) {
        console.log('not implemented');
    }

    getId(item: any) {
        return item['id'];
    }
    getName(item: any) {
        return item['name'];
    }
}

export const hotkeysConfigService = new HlcHotkeysConfigService();

export const hlcConfigProviders = [
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
    },
    {
        provide: HLC_CLR_FILE_UPLOAD_CONFIG,
        useClass: AppFileUploadConfig
    },
    {
        provide: HLC_FIELDS_LAYOUT_CONFIG,
        useClass: HlcClrFormLayoutConfigService
    },
    {
        provide: HlcHotkeysConfigService,
        useValue: hotkeysConfigService
    },
    {
        provide: HLC_HOTKEYS_CONFIG,
        useValue: hotkeysConfigService
    },
    {
        provide: HLC_NG_SELECT_CONFIG,
        useValue: {
            bindValue: 'key',
            bindLabel: 'label'
        }
    }
];
