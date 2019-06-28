import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppsSharedModule } from '@apps/shared';
import { HlcBoxModule } from '@ng-holistic/clr-common';
import { HlcClrTableModule } from '@ng-holistic/clr-list';
import { TableExpandRowPageComponent } from './table-expand-row-page.component';

@NgModule({
    declarations: [TableExpandRowPageComponent],
    imports: [CommonModule, HlcClrTableModule, HlcBoxModule, AppsSharedModule],
    exports: [TableExpandRowPageComponent]
})
export class TableExpandRowPageModule {}
