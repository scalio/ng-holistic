import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { TextMaskModule } from 'angular2-text-mask';
import { MaskComponent } from './mask.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
    imports: [CommonModule, FormsModule, NgxMaskModule],
    declarations: [MaskComponent],
    exports: [MaskComponent]
})
export class MaskModule {}
