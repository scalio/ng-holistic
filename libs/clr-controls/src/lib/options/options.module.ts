import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OptionsComponent } from './options.component';
import { ClrRadioModule } from '@clr/angular';

@NgModule({
    imports: [CommonModule, ClrRadioModule],
    declarations: [OptionsComponent],
    exports: [OptionsComponent]
})
export class HlcClrOptionsModule {
    constructor() {}
}
