import { InjectionToken } from '@angular/core';

export interface DateConfig {
    placeholder?: string;
}

export const DATE_CONFIG = new InjectionToken<DateConfig>('DATE_CONFIG');
