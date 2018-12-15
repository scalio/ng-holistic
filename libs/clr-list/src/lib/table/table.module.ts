import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableComponent } from './table.component';
import { ClrDatagridModule } from '@clr/angular';

@NgModule({
    imports: [CommonModule, ClrDatagridModule],
    declarations: [TableComponent],
    exports: [TableComponent],
})
export class HlcClrTableModule {
}
