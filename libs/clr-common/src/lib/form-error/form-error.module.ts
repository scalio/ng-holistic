import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrIconModule } from '@clr/angular';
import { HlcClrFormErrorComponent } from './form-error.component';

@NgModule({
    declarations: [HlcClrFormErrorComponent],
    exports: [HlcClrFormErrorComponent],
    imports: [CommonModule, ClrIconModule],
    providers: []
})
export class HlcClrFormErrorModule {}
