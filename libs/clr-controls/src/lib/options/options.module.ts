import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcClrOptionsComponent } from './options.component';
import { ClrRadioModule } from '@clr/angular';

@NgModule({
    imports: [CommonModule, ClrRadioModule],
    declarations: [HlcClrOptionsComponent],
    exports: [HlcClrOptionsComponent]
})
export class HlcClrOptionsModule {
    constructor() {}
}
