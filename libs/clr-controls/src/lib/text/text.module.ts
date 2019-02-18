import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClrInputModule } from '@clr/angular';
import { HlcClrTextComponent } from './text.component';

@NgModule({
    imports: [CommonModule, FormsModule, ClrInputModule],
    declarations: [HlcClrTextComponent],
    exports: [HlcClrTextComponent]
})
export class HlcClrTextModule {}
