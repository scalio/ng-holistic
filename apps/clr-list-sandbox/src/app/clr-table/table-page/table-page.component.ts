import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { GetLoadListMixedStorageDecorator, HlcClrTableComponent, Table, TableDescription } from '@ng-holistic/clr-list';
import * as R from 'ramda';
import { Subject, timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';

const table: TableDescription = {
    sort: 'title',
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

const getAllDecorator = new GetLoadListMixedStorageDecorator(
    'table-page',
    x => ({
        page: x.page,
        sort: x.sort
    }),
    (state: any) => !state || R.isNil(state.page) || R.isEmpty(state.page),
    10000
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

const definition = `
import { TableDescription } from '@ng-holistic/clr-list';

const table: TableDescription = {
    sort: 'title',
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
`;

const code = `
import { HlcClrTableComponent, Table, TableDescription } from '@ng-holistic/clr-list';
import * as R from 'ramda';
import { Subject, timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';

const genRows = (len: number): Table.Row[] =>
    R.range(0, len).map(i => ({
        id: i.toString(),
        title: 'aaaa ' + i,
        amount: i * 100
    }));

const dataProvider: Table.Data.DataProvider = {
    load(state: any) {
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
    }
};

@Component({
    selector: 'hlc-clr-sandbox-table-page',
    template: \`
        <button class="btn" (click)="onAddRow()">Add Row</button>
        <hlc-clr-table
            [table]="table"
            [dataProvider]="dataProvider"
            [aggregateRow]="aggregateRow"
            [rowSelectable]="true"
            (cellClick)="onRowEvent($event)"
        >
            <ng-template hlcClrCustomCell="custom" let-row="row"> {{ row['id'] }} </ng-template>
        </hlc-clr-table>
    \`,
    styleUrls: ['./table-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablePageComponent implements OnInit {
    table = table;
    dataProvider = dataProvider;
    aggregateRow = aggregateRow;


    @ViewChild(HlcClrTableComponent) private tableComponent: HlcClrTableComponent;

    constructor() {}

    ngOnInit() {
    }

    onAddRow() {
        this.tableComponent.addRow({ id: new Date().getTime().toString(), title: 'added', amount: 100 });
    }

    onRowEvent(event: any) {
        console.log('+++', event);
    }
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcClrTableModule } from '@ng-holistic/clr-list';
import { TablePageComponent } from './table-page.component';

@NgModule({
    declarations: [TablePageComponent],
    imports: [CommonModule, HlcClrTableModule],
    exports: [TablePageComponent]
})
export class TablePageModule {}

`;

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

    definition = definition;
    code = code;

    @ViewChild(HlcClrTableComponent) private tableComponent: HlcClrTableComponent;

    constructor() {}

    ngOnInit() {
        // reset decorator on init
        // getAllDecorator.reset();
    }

    onAddRow() {
        this.tableComponent.addRow({ id: new Date().getTime().toString(), title: 'added', amount: 100 });
    }

    onRowEvent(event: any) {
        console.log('+++', event);
    }
}
