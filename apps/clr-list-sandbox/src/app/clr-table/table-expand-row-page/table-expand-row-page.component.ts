import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Table, TableDescription } from '@ng-holistic/clr-list';
import { timer, Subject } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import * as R from 'ramda';

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
    ],
    details: {
        cols: [
            {
                id: 'amount',
                title: ''
            },
            {
                id: 'title',
                title: ''
            }
        ],
        rows(parent: any) {
            // return doubled and tribled amount as example
            return [
                { amount: parent['amount'] * 2, title: parent['title'] + '+' },
                { amount: parent['amount'] * 3, title: parent['title'] + '++'}
            ];
        }
    }
};

const rows: Table.Row[] = [
    {
        id: '1',
        title: 'aaaa',
        amount: 2
    },
    {
        id: '2',
        title: 'bbb',
        amount: 3
    }
];

const dataProvider: Table.Data.DataProvider = {
    load(_) {
        console.log(rows);
        return timer(0).pipe(mapTo({ rows }));
    }
};

const aggregateRow: Table.AggregateRow = {
    amount: R.sum
};


const definition = `
import { Table, TableDescription } from '@ng-holistic/clr-list';
import { timer, Subject } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import * as R from 'ramda';

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
    ],
    details: {
        cols: [
            {
                id: 'amount',
                title: ''
            },
            {
                id: 'title',
                title: ''
            }
        ],
        rows(parent: any) {
            // return doubled and tribled amount as example
            return [
                { amount: parent['amount'] * 2, title: parent['title'] + '+' },
                { amount: parent['amount'] * 3, title: parent['title'] + '++'}
            ];
        }
    }
};`;

const code = `
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Table, TableDescription } from '@ng-holistic/clr-list';
import { timer, Subject } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import * as R from 'ramda';
import { table } from './table-definition';

const rows: Table.Row[] = [
    {
        id: '1',
        title: 'aaaa',
        amount: 2
    },
    {
        id: '2',
        title: 'bbb',
        amount: 3
    }
];

const dataProvider: Table.Data.DataProvider = {
    load(_) {
        console.log(rows);
        return timer(0).pipe(mapTo({ rows }));
    }
};

const aggregateRow: Table.AggregateRow = {
    amount: R.sum
};

@Component({
    selector: 'hlc-clr-sandbox-table-expand-row-page',
    templateUrl: './table-expand-row-page.component.html',
    styleUrls: ['./table-expand-row-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableExpandRowPageComponent implements OnInit {
    table = table;
    dataProvider = dataProvider;
    aggregateRow = aggregateRow;

    constructor() {}

    ngOnInit() {}
}

///

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcClrTableModule } from '@ng-holistic/clr-list';
import { TableExpandRowPageComponent } from './hlc-clr-sandbox-table-expand-row-page.component';

@NgModule({
    declarations: [TableExpandRowPageComponent],
    imports: [CommonModule, HlcClrTableModule],
    exports: [TableExpandRowPageComponent]
})
export class TableExpandRowPageModule {}`;

@Component({
    selector: 'hlc-clr-sandbox-table-expand-row-page',
    templateUrl: './table-expand-row-page.component.html',
    styleUrls: ['./table-expand-row-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableExpandRowPageComponent implements OnInit {
    table = table;
    dataProvider = dataProvider;
    aggregateRow = aggregateRow;

    definition = definition;
    code = code;

    constructor() {}

    ngOnInit() {}
}
