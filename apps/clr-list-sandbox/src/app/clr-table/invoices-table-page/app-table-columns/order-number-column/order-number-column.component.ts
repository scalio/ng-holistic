import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Invoices } from '../../models/invoices.models';
import { HlcDefaultBindValue } from '@ng-holistic/forms';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'hlc-order-number-column',
    templateUrl: './order-number-column.component.html',
    styleUrls: ['./order-number-column.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderNumberColumnComponent implements OnInit {

    @HlcDefaultBindValue
    @Input() order: Invoices.Order;

    constructor() {}

    ngOnInit() {}
}
