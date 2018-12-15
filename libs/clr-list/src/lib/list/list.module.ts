import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ListComponent } from './list.component';
import { HlcClrTableModule } from '../table/table.module';
import { HlcClrFilterModule } from '../filter/filter.module';

@NgModule({
    imports: [CommonModule, HlcClrTableModule, HlcClrFilterModule],
    declarations: [ListComponent],
    exports: [ListComponent]
})
export class HlcClrListModule {}
