import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcClrCheckboxesComponent } from './checkboxes.component';
import { ClrCheckboxModule } from '@clr/angular';

@NgModule({
    imports: [CommonModule, ClrCheckboxModule],
    declarations: [HlcClrCheckboxesComponent],
    exports: [HlcClrCheckboxesComponent]
})
export class HlcClrCheckboxesModule {
    constructor() {}
}
