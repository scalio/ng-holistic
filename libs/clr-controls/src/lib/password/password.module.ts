import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcClrPasswordComponent } from './password.component';
import { ClrPasswordModule } from '@clr/angular';

@NgModule({
    imports: [CommonModule, ClrPasswordModule],
    declarations: [HlcClrPasswordComponent],
    exports: [HlcClrPasswordComponent]
})
export class HlcClrPasswordModule {}
