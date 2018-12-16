import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { ClrFormFields } from '@ng-holistic/clr-forms';
import { ListComponent, Table, TableDescription } from '@ng-holistic/clr-list';
import { Subject, timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';

const filterFields: ClrFormFields.FormField[] = [
    {
        id: 'text',
        kind: 'TextField',
        label: 'Text',
        placeholder: 'Type something',
        value: 'test',
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
            id: 'img',
            kind: 'ImgColumn',
            title: 'Img',
            props: {
                src: 'https://pbs.twimg.com/media/DuijXwuWsAAuL7I.jpg',
                height: '100px'
            }
        },
        {
            id: 'custom',
            customCell: true,
            title: 'Custom'
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

const paginator: Table.Data.Paginator = {
    pageSize: 2,
    pageIndex: 1,
    length: 3
};

const dataProvider: Table.Data.DataProvider = {
    load(state) {
        console.log(state);
        return timer(1000).pipe(mapTo({ rows, paginator }));
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

    @ViewChild(ListComponent) private list: ListComponent;

    constructor() {}

    ngOnInit() {}

    onUpdateRow() {
        this.list.upadteRow({ id: '1', title: 'updated' });
    }
}
