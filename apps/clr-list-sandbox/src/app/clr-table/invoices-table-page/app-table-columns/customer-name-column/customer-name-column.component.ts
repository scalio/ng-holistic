import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Invoices } from '../../models/invoices.models';
import { HlcColumnBindValue } from '@ng-holistic/clr-list';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'hlc-customer-name-column',
    templateUrl: './customer-name-column.component.html',
    styleUrls: ['./customer-name-column.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerNameColumnComponent implements OnInit {    
    @Input()
    @HlcColumnBindValue
    customer: Invoices.Customer;

    constructor() {}

    ngOnInit() {}
}
