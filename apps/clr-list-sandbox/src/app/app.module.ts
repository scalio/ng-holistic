import { DecimalPipe, CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {
    HlcClrFilterModule,
    HlcClrTableModule,
    HLC_CLR_TABLE_CELL_FORMAT_MAP,
    HLC_CLR_TABLE_PAGINATOR_ITEMS,
    PaginatorItems,
    TableCellFormatMap
} from '@ng-holistic/clr-list';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';

const paginatorItems: PaginatorItems = {
    items: [
        {
            key: 25,
            label: '25'
        },
        {
            key: 50,
            label: '50'
        },
        {
            key: 100,
            label: '100'
        }
    ]
};

export const getTableCellFormatMap = (decimalPipe: DecimalPipe): TableCellFormatMap => ({
    number: x => ({ val: decimalPipe.transform(x), cls: 'number-cell' })
});

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        CommonModule,
        RouterModule.forRoot([], { initialNavigation: 'enabled', useHash: true, anchorScrolling: 'enabled' }),
        AppRoutingModule,
        HlcClrTableModule.forRoot(),
        HlcClrFilterModule.forRoot()
    ],
    providers: [
        {
            provide: HLC_CLR_TABLE_PAGINATOR_ITEMS,
            useValue: paginatorItems
        },
        DecimalPipe,
        {
            provide: HLC_CLR_TABLE_CELL_FORMAT_MAP,
            useFactory: getTableCellFormatMap,
            deps: [DecimalPipe],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
