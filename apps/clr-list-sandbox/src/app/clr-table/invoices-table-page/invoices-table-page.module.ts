import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcClrTableModule, HLC_CLR_TABLE_CELL_MAP, HLC_CLR_TABLE_CELL_FORMAT_MAP } from '@ng-holistic/clr-list';
import { InvoicesTablePageComponent } from './invoices-table-page.component';
import { CustomerNameColumnComponent } from './app-table-columns/customer-name-column/customer-name-column.component';
import { OrderNumberColumnComponent } from './app-table-columns/order-number-column/order-number-column.component';
import { CardNumberColumnComponent } from './app-table-columns/card-number-column/card-number-column.component';
import { AmountColumnComponent } from './app-table-columns/amount-column/amount-column.component';
import { CurrencyColumnComponent } from './app-table-columns/currency-column/currency-column.component';

export function getAppForamtters(datePipe: DatePipe) {
    return {
        date: (val: any) => datePipe.transform(val)
    };
}

@NgModule({
    declarations: [
        InvoicesTablePageComponent,
        CustomerNameColumnComponent,
        OrderNumberColumnComponent,
        CardNumberColumnComponent,
        AmountColumnComponent,
        CurrencyColumnComponent
    ],
    imports: [CommonModule, HlcClrTableModule],
    exports: [InvoicesTablePageComponent],
    providers: [
        {
            provide: HLC_CLR_TABLE_CELL_MAP,
            multi: true,
            useValue: {
                CustomerName: CustomerNameColumnComponent,
                OrderNumber: OrderNumberColumnComponent,
                CardNumber: CardNumberColumnComponent,
                Amount: AmountColumnComponent,
                Currency: CurrencyColumnComponent
            }
        },
        {
            provide: HLC_CLR_TABLE_CELL_FORMAT_MAP,
            multi: true,
            useFactory: getAppForamtters,
            deps: [DatePipe]
        }
    ],
    entryComponents: [
        CustomerNameColumnComponent,
        OrderNumberColumnComponent,
        CardNumberColumnComponent,
        AmountColumnComponent,
        CurrencyColumnComponent
    ]
})
export class InvoicesTablePageModule {}
