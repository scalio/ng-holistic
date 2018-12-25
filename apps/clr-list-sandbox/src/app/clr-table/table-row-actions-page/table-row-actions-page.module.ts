import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcClrTableModule } from '@ng-holistic/clr-list';
import { TableRowActionsPageComponent } from './table-row-actions-page.component';

@NgModule({
    declarations: [TableRowActionsPageComponent],
    imports: [CommonModule, HlcClrTableModule],
    exports: [TableRowActionsPageComponent]
})
export class TableRowActionsPageModule {}
