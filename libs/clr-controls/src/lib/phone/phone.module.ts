import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PhoneComponent } from './phone.component';
import { NgxMaskModule } from '../ngx-mask';
import { PhonePipe } from '@ng-holistic/clr-common';

@NgModule({
    imports: [CommonModule, NgxMaskModule],
    declarations: [PhoneComponent, PhonePipe],
    exports: [PhoneComponent]
})
export class PhoneModule {}
