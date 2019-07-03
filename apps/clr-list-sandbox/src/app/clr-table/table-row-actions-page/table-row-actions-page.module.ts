import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppsSharedModule } from '@apps/shared';
import { HlcBoxModule } from '@ng-holistic/clr-common';
import { HlcClrTableModule } from '@ng-holistic/clr-list';
import { TableRowActionsPageComponent } from './table-row-actions-page.component';

@NgModule({
    declarations: [TableRowActionsPageComponent],
    imports: [CommonModule, HlcClrTableModule, HlcBoxModule, AppsSharedModule],
    exports: [TableRowActionsPageComponent]
})
export class TableRowActionsPageModule {}
