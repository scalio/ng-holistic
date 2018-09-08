import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TextMaskModule } from 'angular2-text-mask';
import { MaskComponent } from './mask.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, TextMaskModule, FormsModule],
    declarations: [MaskComponent],
    exports: [MaskComponent]
})
export class MaskModule {}
