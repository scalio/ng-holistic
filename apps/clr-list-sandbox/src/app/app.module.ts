import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HlcClrFilterModule, HlcClrTableModule, HLC_CLR_TABLE_PAGINATOR_ITEMS } from '@ng-holistic/clr-list';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';

const tablePageSizeItems = [
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
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot([], { initialNavigation: 'enabled' }),
        AppRoutingModule,
        HlcClrTableModule.forRoot(),
        HlcClrFilterModule.forRoot()
    ],
    providers: [
        {
            provide: HLC_CLR_TABLE_PAGINATOR_ITEMS,
            useValue: tablePageSizeItems
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
