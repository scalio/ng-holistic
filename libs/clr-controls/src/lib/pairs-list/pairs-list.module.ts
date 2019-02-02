import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrInputModule } from '@clr/angular';
import { HlcClrPairsListComponent } from './pairs-list.component';

@NgModule({
    imports: [CommonModule, ClrInputModule],
    declarations: [HlcClrPairsListComponent],
    exports: [HlcClrPairsListComponent]
})
export class HlcClrPairsListModule {
    constructor() {}
}
