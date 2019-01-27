import { ClrFormFields } from '../../models/form-fields.types';
import { InjectionToken } from '@angular/core';
import { HlcClrInputContainerComponent } from '../input-container.component';

export type ValidatorsErrorsMapFun = (container: HlcClrInputContainerComponent) => string;
export type ValidationErrorsMapConfig = ClrFormFields.FieldValidatorsErrorsMap<ValidatorsErrorsMapFun | string>;

export const VALIDATION_ERRORS_MAP_CONFIG = new InjectionToken<ValidationErrorsMapConfig>(
    'VALIDATION_ERRORS_MAP_CONFIG'
);
