import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Table } from '@ng-holistic/clr-list';

const table: Table.TableDescription = {
    cols: [
        {
            id: 'title',
            title: 'Title'
        },
        {
            id: 'capTitle',
            title: 'Title*',
            format(_, row) {
                return row['title'].toUpperCase();
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

@Component({
    selector: 'hlc-clr-sandbox-table-redux-page',
    templateUrl: './table-redux-page.component.html',
    styleUrls: ['./table-redux-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableReduxPageComponent implements OnInit {

    table = table;
    rows = rows;

    constructor() {}

    ngOnInit() {}
}
