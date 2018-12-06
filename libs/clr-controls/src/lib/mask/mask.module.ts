import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// import { TextMaskModule } from 'angular2-text-mask';
import { MaskComponent } from './mask.component';
import { FormsModule } from '@angular/forms';
import { MaskedInputDirective } from './angular2TextMask';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [MaskComponent, MaskedInputDirective],
    exports: [MaskComponent, MaskedInputDirective]
})
export class MaskModule {}
