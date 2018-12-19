import { InjectionToken } from '@angular/core';

export interface FilterLabelsConfig {
    filter: string;
    reset: string;
}

export const defaultFilterLabelsConfig: FilterLabelsConfig = {
    filter: 'Filter',
    reset: 'Reset'
};

export const HLC_CLR_FILTER_LABELS_CONFIG = new InjectionToken<FilterLabelsConfig>('HLC_CLR_FILTER_LABELS_CONFIG');
