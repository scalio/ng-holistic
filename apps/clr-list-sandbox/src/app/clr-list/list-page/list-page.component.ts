import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ClrFormFields } from '@ng-holistic/clr-forms';
import { Validators } from '@angular/forms';
import { Table, TableDescription } from '@ng-holistic/clr-list';
import { timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';

const filterFields: ClrFormFields.FormField[] = [
    {
        id: 'text',
        kind: 'TextField',
        label: 'Text',
        placeholder: 'Type something',
        $validators: [Validators.required]
    },
    {
        id: 'select',
        kind: 'SelectField',
        label: 'Select',
        items: [{ key: 1, label: 'one' }, { key: 2, label: 'two' }]
    },
    {
        id: 'date',
        kind: 'DateField',
        label: 'Date'
    },
    {
        id: 'dateRange',
        kind: 'DateRangeField',
        label: 'Date Range'
    }
];

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

const dataProvider: Table.Data.DataProvider = {
    load(_) {
        return timer(1000).pipe(mapTo({ rows }));
    }
};

@Component({
    selector: 'hlc-clr-sandbox-list-page',
    templateUrl: './list-page.component.html',
    styleUrls: ['./list-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListPageComponent implements OnInit {
    table = table;
    dataProvider = dataProvider;
    filterFields = filterFields;

    constructor() {}

    ngOnInit() {}
}
