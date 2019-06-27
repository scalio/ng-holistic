import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { ClrFormFields } from '@ng-holistic/clr-forms';
import { GetLoadListMixedStorageDecorator, HlcClrListComponent, Table, TableDescription } from '@ng-holistic/clr-list';
import * as R from 'ramda';
import { Subject, timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';
const filterFields: ClrFormFields.FormField[] = [
    {
        id: 'text',
        kind: 'TextField',
        props: {
            label: 'Text',
            placeholder: 'Type something',
            value: 'test'
        },
        validators: [Validators.required]
    },
    {
        id: 'select',
        kind: 'SelectField',
        props: {
            label: 'Select',
            items: [{ key: 1, label: 'one' }, { key: 2, label: 'two' }]
        }
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
    sort: 'title',
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
                title(_, row) {
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

const genRows = (len: number): Table.Row[] =>
    R.range(0, len).map(i => ({
        id: i.toString(),
        title: 'aaaa ' + i,
        amount: i * 100
    }));

/*
const getAllDecorator = new GetAllLocalStorageDecorator(
    'list-page',
    x => ({
        page: x.page,
        sort: x.sort,
        filters: x.filters
    }),
    (state: any) => !state || R.isNil(state.page) || R.isEmpty(state.page)
);
*/

const getAllDecorator = new GetLoadListMixedStorageDecorator(
    'list-page',
    x => ({
        page: x.page,
        sort: x.sort,
        filters: x.filters
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
        const filters = state && state.filters;
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
        const result = { rows: rows, paginator, page, sort, filters };
        return timer(0).pipe(mapTo(result));
    },

    load(state: any) {
        const decorated = getAllDecorator.decorate(this._load);
        return decorated(state);
    }
};

const definition = `
import { ClrFormFields } from '@ng-holistic/clr-forms';
import { TableDescription } from '@ng-holistic/clr-list';

const filterFields: ClrFormFields.FormField[] = [
    {
        id: 'text',
        kind: 'TextField',
        props: {
            label: 'Text',
            placeholder: 'Type something',
            value: 'test'
        },
        validators: [Validators.required]
    },
    {
        id: 'select',
        kind: 'SelectField',
        props: {
            label: 'Select',
            items: [{ key: 1, label: 'one' }, { key: 2, label: 'two' }]
        }
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
    sort: 'title',
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
                title(_, row) {
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
};`;

const code = `
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { ClrFormFields } from '@ng-holistic/clr-forms';
import { GetLoadListMixedStorageDecorator, HlcClrListComponent, Table, TableDescription } from '@ng-holistic/clr-list';
import * as R from 'ramda';
import { Subject, timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';

const genRows = (len: number): Table.Row[] =>
    R.range(0, len).map(i => ({
        id: i.toString(),
        title: 'aaaa ' + i,
        amount: i * 100
    }));

const getAllDecorator = new GetLoadListMixedStorageDecorator(
    'list-page',
    x => ({
        page: x.page,
        sort: x.sort,
        filters: x.filters
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
        const filters = state && state.filters;
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
        const result = { rows: rows, paginator, page, sort, filters };
        return timer(0).pipe(mapTo(result));
    },

    load(state: any) {
        // This decorator allow to persists / restore filter for the list
        const decorated = getAllDecorator.decorate(this._load);
        return decorated(state);
    }
};

@Component({
    selector: 'hlc-clr-sandbox-list-page',
    template: \`
        <hlc-clr-list render
            [filterFields]="filterFields" [table]="table" [dataProvider]="dataProvider" [rowSelectable]="true">
            <button toolbox class="btn btn-sm btn-secondary" (click)="onUpdateRow()" style="float: right">
                Update row
            </button>
            <ng-template hlcClrCustomCell="custom" let-row="row"> {{ row['id'] }} : {{ row['title'] }} </ng-template>
        </hlc-clr-list>

    \`,
    styleUrls: ['./list-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListPageComponent implements OnInit {
    table = table;
    dataProvider = dataProvider;
    filterFields = filterFields;

    @ViewChild(HlcClrListComponent) private list: HlcClrListComponent;

    constructor() {}

    ngOnInit() {}

    onUpdateRow() {
        this.list.upadteRow({ id: '1', title: 'updated' });
    }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ListPageComponent } from './list-page.component';
import { HlcClrListModule } from '@ng-holistic/clr-list';


@NgModule({
    declarations: [ListPageComponent],
    imports: [CommonModule, HlcClrListModule],
    exports: [ListPageComponent]
})
export class ListPageModule {}

`;

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

    definition = definition;
    code = code;

    // @ts-ignore
    @ViewChild(HlcClrListComponent, { static: false }) private list: HlcClrListComponent;

    constructor() {}

    ngOnInit() {}

    onUpdateRow() {
        this.list.upadteRow({ id: '1', title: 'updated' });
    }
}
