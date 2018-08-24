import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ClrDatagridModule, ClrIconModule } from '@clr/angular';
import { ListTableComponent } from './list-table.component';
import { SelectModule } from '@ng-holistic/clr-controls';
import { SanitizeHtmlPipe } from '@ng-holistic/core';

@NgModule({
    imports: [BrowserModule, CommonModule, ClrIconModule, ClrDatagridModule, SelectModule],
    declarations: [ListTableComponent, SanitizeHtmlPipe],
    exports: [ListTableComponent]
})
export class ListTableModule {
    constructor() {}
}
