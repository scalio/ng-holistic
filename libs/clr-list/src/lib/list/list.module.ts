import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcClrListComponent } from './list.component';
import { HlcClrTableModule } from '../table/table.module';
import { HlcClrFilterModule } from '../filter/filter.module';
import { CustomCellDirective } from '../table/custom-cell.directive';
import { ClrIconModule } from '@clr/angular';

@NgModule({
    imports: [CommonModule, HlcClrTableModule, HlcClrFilterModule, ClrIconModule],
    declarations: [HlcClrListComponent],
    exports: [HlcClrListComponent, CustomCellDirective]
})
export class HlcClrListModule {}
