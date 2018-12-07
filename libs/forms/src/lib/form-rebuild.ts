import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { IFormGroup } from './models/form-layouts.types';
import { FormGroup } from '@angular/forms';

export type FormLayoutConfig = IFormGroup<any> | ((formGroup: FormGroup) => IFormGroup<any>);

export interface FormRebuidProvider {
    rebuildForm$: Observable<any>;
    rebuildFormLayoutConfig:
        (data: any, formValue: any) => FormLayoutConfig;
}

export const HLC_FORM_REBUILD_PROVIDER = new InjectionToken<FormRebuidProvider>('HLC_FORM_REBUILD_PROVIDER');
