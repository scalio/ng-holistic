import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PhoneComponent } from './phone.component';
import { NgxMaskModule } from '../ngx-mask/ngx-mask.module';

@NgModule({
    imports: [CommonModule, NgxMaskModule],
    declarations: [PhoneComponent],
    exports: [PhoneComponent]
})
export class PhoneModule {}
