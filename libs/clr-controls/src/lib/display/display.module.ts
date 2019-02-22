import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcClrDisplayComponent } from './display.component';

@NgModule({
    imports: [CommonModule],
    declarations: [HlcClrDisplayComponent],
    exports: [HlcClrDisplayComponent]
})
export class HlcClrDisplayModule {}
