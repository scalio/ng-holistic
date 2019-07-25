import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Invoices } from '../../models/invoices.models';
import { HlcDefaultBindValue } from '@ng-holistic/forms';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'hlc-customer-name-column',
    templateUrl: './customer-name-column.component.html',
    styleUrls: ['./customer-name-column.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerNameColumnComponent implements OnInit {    
    @HlcDefaultBindValue
    @Input()    
    customer: Invoices.Customer;

    constructor() {}

    ngOnInit() {}
}
