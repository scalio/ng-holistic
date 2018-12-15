import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableComponent } from './table.component';
import { ClrDatagridModule, ClrLoadingModule } from '@clr/angular';

@NgModule({
    imports: [CommonModule, ClrDatagridModule, ClrLoadingModule],
    declarations: [TableComponent],
    exports: [TableComponent],
})
export class HlcClrTableModule {
}
