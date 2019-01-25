import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HlcClrTextAreaComponent } from './text-area.component';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [HlcClrTextAreaComponent],
    exports: [HlcClrTextAreaComponent],
    entryComponents: [HlcClrTextAreaComponent]
})
export class HlcClrTextAreaModule {}
