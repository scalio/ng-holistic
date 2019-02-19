import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClrSelectModule } from '@clr/angular';
import { HlcClrMultiSelectComponent } from './multi-select.component';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, ClrSelectModule],
    declarations: [HlcClrMultiSelectComponent],
    exports: [HlcClrMultiSelectComponent]
})
export class HlcClrMultiSelectModule {
    constructor() {}
}
