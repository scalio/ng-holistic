import { InjectionToken } from '@angular/core';

export interface ListLabelsConfig {
    hideFilter: string;
    showFilter: string;
}

export const defaultListLabelsConfig: ListLabelsConfig = {
    hideFilter: 'Hide Filter',
    showFilter: 'Show Filter'
};

export const HLC_CLR_LIST_LABELS_CONFIG = new InjectionToken<ListLabelsConfig>('HLC_CLR_LIST_LABELS_CONFIG');
