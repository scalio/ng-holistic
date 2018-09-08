import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TextMaskModule } from 'angular2-text-mask';
import { MaskComponent } from './mask.component';

@NgModule({
    imports: [CommonModule, TextMaskModule],
    declarations: [MaskComponent],
    exports: [MaskComponent]
})
export class MaskModule {}
