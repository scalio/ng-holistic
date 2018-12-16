import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Table, TableDescription } from '@ng-holistic/clr-list';
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
            kind: 'LinkColumn',
            title: 'Link',
            props: {
                title(row) {
                    return row['title'];
                },
                link: 'some link',
                clicked: new Subject()
            }
        },
        {
            id: 'custom',
            customCell: true,
            title: 'Custom',
        }
    ]
};

const rows: Table.Row[] = [
    {
        id: '1',
        title: 'aaaa'
    },
    {
        id: '2',
        title: 'bbb'
    }
];

const dataProvider: Table.Data.DataProvider = {
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
