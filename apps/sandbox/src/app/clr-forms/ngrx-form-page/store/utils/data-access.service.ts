import { Injectable } from '@angular/core';
import { FormDataProvider } from '@ng-holistic/ngrx-forms';
import { of } from 'rxjs';
import { Item } from '../models';
import { item, dicts } from './mock.data';

@Injectable()
export class DataAccessService implements FormDataProvider<string, Item> {
    create(data: Item) {
        return of({ id: new Date().toString(), ...data });
    }

    read(_: string) {
        return of(item);
    }

    update(data: Item) {
        return of(data);
    }

    delete(_: string) {
        return of();
    }

    loadDicts(_: any) {
        console.log('111', dicts);
        return of(dicts);
    }
}
