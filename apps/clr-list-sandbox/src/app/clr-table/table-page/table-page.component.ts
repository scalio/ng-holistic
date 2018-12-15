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
    selector: 'hlc-clr-sandbox-table-page',
    templateUrl: './table-page.component.html',
    styleUrls: ['./table-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablePageComponent implements OnInit {

    table = table;
    rows = rows;

    constructor() {}

    ngOnInit() {}
}
