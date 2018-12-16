import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Table, TableData, TableDescription } from '@ng-holistic/clr-list';
import { timer, Subject } from 'rxjs';
import { mapTo } from 'rxjs/operators';

const table: TableDescription = {
    cols: [
        {
            id: 'title',
            title: 'Title',
            sort: true
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
            kind: 'LinkCell',
            title: 'Link',
            props: {
                title(row) {
                    return row['title'];
                },
                link: 'some link',
                click: new Subject()
            }
        }
    ]
};

const rows: Table.Row[] = [
    {
        id: 'title',
        title: 'aaaa'
    },
    {
        id: 'title',
        title: 'bbb'
    }
];

const dataProvider: TableData.DataProvider = {
    load(state) {
        console.log(state);
        return timer(0).pipe(mapTo({ rows }));
    }
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

    constructor() {}

    ngOnInit() {}
}
