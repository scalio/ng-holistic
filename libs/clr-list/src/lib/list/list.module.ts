import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrIconModule } from '@clr/angular';
import { HlcClrFilterModule } from '../filter/filter.module';
import { CustomCellDirective } from '../table/custom-cell.directive';
import { RowDetailDirective } from '../table/row-detail.directive';
import { HlcClrTableModule } from '../table/table.module';
import { HlcClrListComponent } from './list.component';

@NgModule({
    imports: [CommonModule, HlcClrTableModule, HlcClrFilterModule, ClrIconModule],
    declarations: [HlcClrListComponent],
    exports: [HlcClrListComponent, CustomCellDirective, RowDetailDirective]
})
export class HlcClrListModule {}
