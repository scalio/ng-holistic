import { Injectable } from '@angular/core';
import { FormDataProvider } from '@ng-holistic/ngrx-forms';
import { of } from 'rxjs';
import { Item } from '../models';

@Injectable()
export class DataAccessService implements FormDataProvider<string, Item> {
    create(data: Item) {
        return of({ id: new Date().toString(), ...data });
    }

    read(id: string) {
        return of({ id: id, name: 'test' });
    }

    update(data: Item) {
        return of(data);
    }

    delete(_: string) {
        return of();
    }
}
