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

export interface ObjectMap<T = any, TId = any> {
    getKey(item: T, undef: any): TId;
    getLabel(item: T, undef: any): string;
}

export const objectMap = (config: ListItemsConfig | undefined): ObjectMap => ({
    getKey(item: any, undef: any) {
        return config && config.objectMapper ? item[config.objectMapper.keyField] : undef;
    },
    getLabel(item: any, undef: any) {
        return config && config.objectMapper ? item[config.objectMapper.labelField] : undef;
    }
});
