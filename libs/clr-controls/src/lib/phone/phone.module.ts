import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcClrPhoneComponent } from './phone.component';
import { NgxMaskModule } from '../ngx-mask/ngx-mask.module';

@NgModule({
    imports: [CommonModule, NgxMaskModule],
    declarations: [HlcClrPhoneComponent],
    exports: [HlcClrPhoneComponent]
})
export class HlcClrPhoneModule {}
