import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppsSharedModule } from '@apps/shared';
import { HlcBoxModule } from '@ng-holistic/clr-common';
import { HlcClrTableModule } from '@ng-holistic/clr-list';
import { TablePageComponent } from './table-page.component';

@NgModule({
    declarations: [TablePageComponent],
    imports: [CommonModule, HlcClrTableModule, HlcBoxModule, AppsSharedModule],
    exports: [TablePageComponent]
})
export class TablePageModule {}
