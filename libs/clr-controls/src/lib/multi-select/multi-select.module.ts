import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HlcClrMultiSelectComponent } from './multi-select.component';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule],
    declarations: [HlcClrMultiSelectComponent],
    exports: [HlcClrMultiSelectComponent]
})
export class HlcClrMultiSelectModule {
    constructor() {}
}
