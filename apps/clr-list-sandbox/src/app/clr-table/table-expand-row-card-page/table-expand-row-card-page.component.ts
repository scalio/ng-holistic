import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Table, TableDescription } from '@ng-holistic/clr-list';
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
        }
    ],
    details: {
        rows(parent: any) {
            // return doubled and tribled amount as example
            return [
                { amount: parent['amount'] * 2, title: parent['title'] + '+' },
                { amount: parent['amount'] * 3, title: parent['title'] + '++' }
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

@Component({
    selector: 'hlc-clr-sandbox-table-expand-row-card-page',
    templateUrl: './table-expand-row-card-page.component.html',
    styleUrls: ['./table-expand-row-card-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableExpandRowCardPageComponent implements OnInit {
    table = table;
    dataProvider = dataProvider;

    constructor() {}

    ngOnInit() {}
}
