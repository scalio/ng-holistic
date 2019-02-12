import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcClrPairsListModule } from '@ng-holistic/clr-controls';
import { PairsListPageComponent } from './pairs-list-page.component';

@NgModule({
    declarations: [PairsListPageComponent],
    imports: [CommonModule, HlcClrPairsListModule],
    exports: [PairsListPageComponent]
})
export class PairsListPageModule {}
