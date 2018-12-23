import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableExpandRowCardPageComponent } from './table-expand-row-card-page.component';
import { HlcClrTableModule } from '@ng-holistic/clr-list';

@NgModule({
    declarations: [TableExpandRowCardPageComponent],
    imports: [CommonModule, HlcClrTableModule],
    exports: [TableExpandRowCardPageComponent]
})
export class TableExpandRowCardPageModule {}
