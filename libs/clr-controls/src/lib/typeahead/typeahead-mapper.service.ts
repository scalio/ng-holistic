import { Injectable } from '@angular/core';

export interface TypeaheadMapper {
    getKey(item: any): string;
    getLabel(item: any): string;
    getDescription?(item: any): string;
}

@Injectable({ providedIn: 'root' })
export class TypeaheadMapperService implements TypeaheadMapper {
    getKey(item: any) {
        return item['key'];
    }

    getLabel(item: any) {
        return item['label'];
    }

    getDescription(item: any) {
        return item['label'];
    }
}

export class TypeaheadStrMapperService implements TypeaheadMapper {
    getKey(item: any) {
        return item;
    }

    getLabel(item: any) {
        return item;
    }
}
