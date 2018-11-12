import { ClrFormFields } from '../../models';
import { InjectionToken } from '@angular/core';
import { InputContainerComponent } from '../input-container.component';

export type ValidatorsErrorsMapFun = (container: InputContainerComponent) => string;
export type ValidationErrorsMapConfig = ClrFormFields.FieldValidatorsErrorsMap<ValidatorsErrorsMapFun | string>;

export const VALIDATION_ERRORS_MAP_CONFIG = new InjectionToken<ValidationErrorsMapConfig>(
    'VALIDATION_ERRORS_MAP_CONFIG'
);
