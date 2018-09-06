import { InjectionToken } from '@angular/core';

/**
 * Config for controls, displayed list of simple items key - value
 */

export interface ListItemsObjectMapper {
    keyField: string;
    labelField: string;
    isNewField?: string;
}

export const listItemsDefaultObjectMapper: ListItemsObjectMapper = {
    keyField: 'key',
    labelField: 'label',
    isNewField: 'isNew'
};

export interface ListItemsConfig {
    objectMapper?: ListItemsObjectMapper;
}

export const LIST_ITEMS_CONFIG = new InjectionToken('LIST_ITEMS_CONFIG');
