import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DictMapperService {
    getKey(item: any) {
        return item['key'];
    }

    getLabel(item: any) {
        return item['label'];
    }
}
