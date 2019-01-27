import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrIconModule } from '@clr/angular';
import { HlcClrFilterInputWrapperComponent } from './filter-input-wrapper.component';

@NgModule({
    imports: [CommonModule, ClrIconModule],
    declarations: [HlcClrFilterInputWrapperComponent],
    exports: [HlcClrFilterInputWrapperComponent]
})
export class HlcClrFilterInputWrapperModule {}
