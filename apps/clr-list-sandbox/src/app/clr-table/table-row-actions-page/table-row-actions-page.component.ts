import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { HlcClrTableComponent, Table, TableDescription } from '@ng-holistic/clr-list';
import { Subject, timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';

interface TableRow extends Table.RowBase {
    title: string;
    amount: number;
}

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
    rowActions: (row: TableRow) =>
        row.id === '2' ? [{ id: 'remove', title: 'Remove' }, { id: 'edit', title: 'Edit' }] : []
};

const rows: TableRow[] = [
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
        return timer(0).pipe(mapTo({ rows }));
    }
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
    rowActions: (row: TableRow) =>
        row.id === '2' ? [{ id: 'remove', title: 'Remove' }, { id: 'edit', title: 'Edit' }] : []
};`;

const code = `
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Table, TableDescription } from '@ng-holistic/clr-list';
import { timer, Subject } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import * as R from 'ramda';
import { table } from './table-definition';

const dataProvider: Table.Data.DataProvider = {
    load(_) {
        return timer(0).pipe(mapTo({ rows }));
    }
};

@Component({
    selector: 'hlc-clr-sandbox-table-row-actions-page',
    templateUrl: './table-row-actions-page.component.html',
    styleUrls: ['./table-row-actions-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableRowActionsPageComponent implements OnInit {
    table = table;
    dataProvider = dataProvider;

    constructor() {}

    ngOnInit() {}

    onRowAction(rowAction: Table.RowAction) {
        console.log('onRowAction', rowAction);
    }
}
`;

@Component({
    selector: 'hlc-clr-sandbox-table-row-actions-page',
    templateUrl: './table-row-actions-page.component.html',
    styleUrls: ['./table-row-actions-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableRowActionsPageComponent implements OnInit {
    @ViewChild(HlcClrTableComponent, { static: false }) listComponent: HlcClrTableComponent;

    definition = definition;
    code = code;

    table = table;
    dataProvider = dataProvider;

    constructor() {}

    ngOnInit() {}

    onRowAction(evt: Table.RowActionEvent) {
        console.log('onRowAction', evt);
        if (evt.action.id === 'remove') {
            this.listComponent.removeRow(evt.row);
        }
    }
}
