import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableReduxPageComponent } from './table-redux-page.component';
import { HlcClrTableModule } from '@ng-holistic/clr-list';

@NgModule({
    declarations: [TableReduxPageComponent],
    imports: [CommonModule, HlcClrTableModule],
    exports: [TableReduxPageComponent]
})
export class TableReduxPageModule {}
