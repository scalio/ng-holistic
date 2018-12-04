import { Injectable } from '@angular/core';

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
