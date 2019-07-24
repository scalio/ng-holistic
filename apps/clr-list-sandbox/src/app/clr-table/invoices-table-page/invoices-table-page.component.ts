import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Table } from '@ng-holistic/clr-list';
import { timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { definition } from './invoices-table-page.defintion';

const dataProvider: Table.Data.DataProvider = {
    load(_) {
        return timer(0).pipe(
            mapTo({
                rows: [
                    {
                        id: 0,
                        customer: { name: 'Homer Simpson', avatar: 'http://lol' },
                        order: { number: 'ABCD', image: 'http://lol', data: new Date().toISOString() },
                        card: '12890-***-77',
                        address: 'Springfield',
                        amount: 1000,
                        currency: 'USD'
                    }
                ]
            })
        );
    }
};

@Component({
    selector: 'hlc-clr-sandbox-invoices-table-page',
    templateUrl: './invoices-table-page.component.html',
    styleUrls: ['./invoices-table-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoicesTablePageComponent implements OnInit {
    dataProvider = dataProvider;
    defintion = definition;
    constructor() {}

    ngOnInit() {}
}
