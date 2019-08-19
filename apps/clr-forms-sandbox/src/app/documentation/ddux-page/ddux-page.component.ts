import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

const tableDefStr = `
const tableDef: TableDescription = {
    cols: [
        {
            id: 'customer',
            title: 'Customer Name',
            kind: 'CustomerName',
            sort: true
        },
        {
            id: 'orderNumber',
            title: 'Order Number',
            kind: 'OrderNumber',
            sort: true
        },
        {
            id: 'orderDate',
            title: 'Order Date',
            format: 'date:short',
            sort: true
        },
        {
            id: 'cardNumber',
            title: 'Card Number',
            kind: 'CardNumber'
        },
        {
          id: 'address',
          title: 'Address'
        },
        {
            id: 'amount',
            title: 'Amount',
            kind: 'Amount',
            sort: true
        },
        {
            id: 'currency',
            title: 'Currency',
            kind: 'Currency'
        }
    ]
};
`;

@Component({
    selector: 'hlc-clr-sandbox-ddux-page',
    templateUrl: './ddux-page.component.html',
    styleUrls: ['./ddux-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DduxPageComponent implements OnInit {
    tableDef = tableDefStr;

    constructor() {}

    ngOnInit() {}
}
