import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TableConfig } from '@ng-holistic/clr-lists';

const config = {
    cols: [
        {
            id: 'name',
            title: 'Name',
            type: 'Text'
        },
        {
            id: 'date',
            title: 'Date',
            type: 'Text'
        }
    ]
} as TableConfig;

const items = [{ name: 'Jhon', date: 'today' }, { name: 'Bart', date: 'today' }];

@Component({
    selector: 'hlc-base-list-page',
    templateUrl: './base-list-page.component.html',
    styleUrls: ['./base-list-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseListPageComponent implements OnInit {
    config = config;
    items = items;

    constructor() {}

    ngOnInit() {}
}
