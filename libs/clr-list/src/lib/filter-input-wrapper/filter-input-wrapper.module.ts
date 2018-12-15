import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrIconModule } from '@clr/angular';
import { FilterInputWrapperComponent } from './filter-input-wrapper.component';

@NgModule({
    imports: [CommonModule, ClrIconModule],
    declarations: [FilterInputWrapperComponent],
    exports: [FilterInputWrapperComponent]
})
export class HlcClrFilterInputWrapperModule {}
