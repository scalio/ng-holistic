import { InjectionToken } from '@angular/core';

/**
 * Config for controls, displayed list of simple items key - value
 */

export interface ListItemsObjectMapper {
    mapKey: (obj: any) => string;
    mapLabel: (obj: any) => string;
}

export const listItemsDefaultObjectMapper: ListItemsObjectMapper = {
    mapKey(obj) {
        return obj['key'];
    },

    mapLabel(obj) {
        return obj['label'];
    }
};

export interface ListItemsConfig {
    objectMapper?: ListItemsObjectMapper;
}

export const LIST_ITEMS_CONFIG = new InjectionToken('LIST_ITEMS_CONFIG');
