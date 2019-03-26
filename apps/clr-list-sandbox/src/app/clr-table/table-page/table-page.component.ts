import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GetAllLocalStorageDecorator, Table, TableDescription } from '@ng-holistic/clr-list';
import * as R from 'ramda';
import { Subject, timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';

const table: TableDescription = {
    cols: [
        {
            id: 'title',
            title: 'Title',
            sort: true
        },
        {
            id: 'amount',
            title: 'Amount',
            sort: false
        },
        {
            id: 'capTitle',
            title: 'Title*',
            format(_, row) {
                return row['title'].toUpperCase();
            }
        },
        {
            id: 'link',
            kind: 'LinkColumn',
            title: 'Link',
            props: {
                title(_, row) {
                    return row['title'];
                },
                link: 'some link',
                clicked: new Subject()
            }
        },
        {
            id: 'custom',
            customCell: true,
            title: 'Custom'
        }
    ]
};

const genRows = (len: number): Table.Row[] =>
    R.range(0, len).map(i => ({
        id: i.toString(),
        title: 'aaaa ' + i,
        amount: i * 100
    }));

const getAllDecorator = new GetAllLocalStorageDecorator(
    'table-page',
    x => ({
        page: x.page,
        sort: x.sort
    }),
    (state: any) => !state || R.isNil(state.page) || R.isEmpty(state.page)
);

const dataProvider: { _load: any } & Table.Data.DataProvider = {
    _load(state: any) {
        console.log('load', state);
        const length = 30;
        const page = (state && state.page) || {};
        const sort = state && state.sort;
        const pageSize = (page && page.size) || 25;
        const paginator: Table.Data.Paginator = {
            pageSize,
            pageIndex: page.from ? ((page.from + 1) % pageSize) + 1 : 1,
            length
        };
        const rows = R.pipe(
            genRows,
            R.drop(page.from ? page.from : 0),
            R.take(page.to ? page.to - page.from + 1 : pageSize)
        )(length);
        const result = { rows: rows, paginator, page, sort };
        return timer(0).pipe(mapTo(result));
    },

    load(state: any) {
        const decorated = getAllDecorator.decorate(this._load);
        return decorated(state);
    }
};

const aggregateRow: Table.AggregateRow = {
    amount: R.sum
};

@Component({
    selector: 'hlc-clr-sandbox-table-page',
    templateUrl: './table-page.component.html',
    styleUrls: ['./table-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablePageComponent implements OnInit {
    table = table;
    dataProvider = dataProvider;
    aggregateRow = aggregateRow;

    constructor() {}

    ngOnInit() {
        // reset decorator on init
        // getAllDecorator.reset();
    }
}
