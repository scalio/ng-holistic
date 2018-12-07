import { InjectionToken } from '@angular/core';
import { IFormGroup } from './models/form-layouts.types';
import { FormFields } from './models/form-fields.type';

export type ExtractFieldsFun = (group: IFormGroup<any>) => FormFields.FormField[];

export const HLC_FORM_EXTRACT_FIELDS = new InjectionToken<ExtractFieldsFun>('HLC_FORM_EXTRACT_FIELDS');
