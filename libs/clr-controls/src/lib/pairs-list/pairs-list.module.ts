import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcClrPairsListComponent } from './pairs-list.component';
import { ClrCheckboxModule } from '@clr/angular';

@NgModule({
    imports: [CommonModule, ClrCheckboxModule],
    declarations: [HlcClrPairsListComponent],
    exports: [HlcClrPairsListComponent]
})
export class HlcClrPairsListModule {
    constructor() {}
}
