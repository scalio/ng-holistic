import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilterPageComponent } from './filter-page.component';
import { HlcClrFilterModule } from '@ng-holistic/clr-list';

@NgModule({
    declarations: [FilterPageComponent],
    imports: [CommonModule, HlcClrFilterModule],
    exports: [FilterPageComponent]
})
export class FilterPageModule {}
