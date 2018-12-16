import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ListComponent } from './list.component';
import { HlcClrTableModule } from '../table/table.module';
import { HlcClrFilterModule } from '../filter/filter.module';
import { CustomCellDirective } from '../table/custom-cell.directive';

@NgModule({
    imports: [CommonModule, HlcClrTableModule, HlcClrFilterModule],
    declarations: [ListComponent],
    exports: [ListComponent, CustomCellDirective]
})
export class HlcClrListModule {}
