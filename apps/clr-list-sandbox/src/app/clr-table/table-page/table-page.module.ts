import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TablePageComponent } from './table-page.component';
import { HlcClrTableModule } from '@ng-holistic/clr-list';
import { HlcBoxModule } from '@ng-holistic/clr-common';

@NgModule({
    declarations: [TablePageComponent],
    imports: [CommonModule, HlcClrTableModule, HlcBoxModule],
    exports: [TablePageComponent]
})
export class TablePageModule {}
