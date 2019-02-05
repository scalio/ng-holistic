import { Injectable } from '@angular/core';
import { assoc } from 'ramda';

export interface DictMapper {
    getKey(item: any): any;
    getLabel(item: any): any;
}

@Injectable({ providedIn: 'root' })
export class DictMapperService implements DictMapper {
    getKey(item: any) {
        return item['key'];
    }

    getLabel(item: any) {
        return item['label'];
    }
}

@Injectable({ providedIn: 'root' })
export class DictMapperSetterService {
    setKey(item: any, key: string) {
        // item['key'] = key;
        return assoc('key', key, item);
    }

    setLabel(item: any, label: string) {
        // item['label'] = label;
        // return item;
        return assoc('label', label, item);
    }
}
