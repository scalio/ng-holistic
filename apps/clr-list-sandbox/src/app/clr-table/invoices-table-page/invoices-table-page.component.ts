import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Table } from '@ng-holistic/clr-list';
import { definition } from './invoices-table-page.defintion';
import { InvoicesService } from './invoices.service';

@Component({
    selector: 'hlc-clr-sandbox-invoices-table-page',
    templateUrl: './invoices-table-page.component.html',
    styleUrls: ['./invoices-table-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoicesTablePageComponent implements OnInit {
    readonly dataProvider: Table.Data.DataProvider;
    definition = definition;
    constructor(invoices: InvoicesService) {
        this.dataProvider = { load: invoices.load };
    }

    ngOnInit() {}
}
