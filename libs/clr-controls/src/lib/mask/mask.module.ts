import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { TextMaskModule } from 'angular2-text-mask';
import { HlcClrMaskComponent } from './mask.component';
import { NgxMaskModule } from '../ngx-mask/ngx-mask.module';

@NgModule({
    imports: [CommonModule, FormsModule, NgxMaskModule],
    declarations: [HlcClrMaskComponent],
    exports: [HlcClrMaskComponent]
})
export class HlcClrMaskModule {}
