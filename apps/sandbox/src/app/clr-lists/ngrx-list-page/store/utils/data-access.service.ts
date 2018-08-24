import { Injectable } from '@angular/core';
import { List } from '@ng-holistic/lists';
import { ListDataProvider } from '@ng-holistic/ngrx-lists';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

const items = [{ id: '0', name: 'Jhon', date: 'today' }, { id: '1', name: 'Bart', date: 'today' }];

@Injectable()
export class DataAccessService implements ListDataProvider {
    load(_: List.SearchParams): Observable<List.SearchResult> {
        return of({
            items,
            paginator: {
                length: 2,
                pageSize: 10,
                pageIndex: 0
            }
        }).pipe(delay(100));
    }
}
