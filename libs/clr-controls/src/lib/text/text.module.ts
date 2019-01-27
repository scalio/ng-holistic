import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HlcClrTextComponent } from './text.component';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [HlcClrTextComponent],
    exports: [HlcClrTextComponent],
    entryComponents: [HlcClrTextComponent]
})
export class HlcClrTextModule {}
