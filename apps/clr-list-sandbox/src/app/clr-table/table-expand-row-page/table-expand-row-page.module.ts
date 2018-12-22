import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableExpandRowPageComponent } from './table-expand-row-page.component';
import { HlcClrTableModule } from '@ng-holistic/clr-list';

@NgModule({
    declarations: [TableExpandRowPageComponent],
    imports: [CommonModule, HlcClrTableModule],
    exports: [TableExpandRowPageComponent]
})
export class TableExpandRowPageModule {}
