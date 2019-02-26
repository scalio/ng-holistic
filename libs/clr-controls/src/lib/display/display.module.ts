import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrIconModule, ClrTooltipModule } from '@clr/angular';
import { HlcClrDisplayComponent } from './display.component';

@NgModule({
    imports: [CommonModule, ClrIconModule, ClrTooltipModule],
    declarations: [HlcClrDisplayComponent],
    exports: [HlcClrDisplayComponent]
})
export class HlcClrDisplayModule {}
