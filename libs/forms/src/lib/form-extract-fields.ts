import { InjectionToken } from '@angular/core';
import { FormFields, IFormGroup } from './models';

export type ExtractFieldsFun = (group: IFormGroup<any>) => FormFields.FormField[];

export const HLC_FORM_EXTRACT_FIELDS = new InjectionToken<ExtractFieldsFun>('HLC_FORM_EXTRACT_FIELDS');
