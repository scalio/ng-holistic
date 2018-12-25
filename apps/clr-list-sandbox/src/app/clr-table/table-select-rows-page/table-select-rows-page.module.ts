import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcClrTableModule } from '@ng-holistic/clr-list';
import { TableSelectRowsPageComponent } from './table-select-rows-page.component';

@NgModule({
    declarations: [TableSelectRowsPageComponent],
    imports: [CommonModule, HlcClrTableModule],
    exports: [TableSelectRowsPageComponent]
})
export class TableSelectRowsPageModule {}
