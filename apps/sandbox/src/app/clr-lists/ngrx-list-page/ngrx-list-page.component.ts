import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TableConfig } from '@ng-holistic/clr-lists';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NgrxListStateModel } from './models';
import { selectNgrxListPage, SubListAction } from './store';
import { SubListActions } from '@ng-holistic/ngrx-lists';
import { map } from 'rxjs/operators';

const config = {
    cols: [
        {
            id: 'name',
            title: 'Name',
            type: 'Text'
        },
        {
            id: 'date',
            title: 'Date',
            type: 'Text'
        }
    ]
} as TableConfig;

@Component({
    selector: 'hlc-ngrx-list-page',
    templateUrl: './ngrx-list-page.component.html',
    styleUrls: ['./ngrx-list-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgrxListPageComponent implements OnInit {
    config = config;
    readonly page$: Observable<NgrxListStateModel>;
    readonly items$: any;

    constructor(private readonly store: Store<any>) {
        this.page$ = store.select(selectNgrxListPage);
        this.items$ = this.page$.pipe(map(x => x.items));
    }

    ngOnInit() {}

    onRefresh(data: any) {
        this.store.dispatch(new SubListAction(new SubListActions.Load(data)));
    }
}
