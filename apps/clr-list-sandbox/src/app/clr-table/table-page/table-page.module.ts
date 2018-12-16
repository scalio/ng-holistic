import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TablePageComponent } from './table-page.component';
import { HlcClrTableModule } from '@ng-holistic/clr-list';

@NgModule({
    declarations: [TablePageComponent],
    imports: [CommonModule, HlcClrTableModule],
    exports: [TablePageComponent]
})
export class TablePageModule {}
