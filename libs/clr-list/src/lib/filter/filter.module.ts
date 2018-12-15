import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilterComponent } from './filter.component';

@NgModule({
    imports: [CommonModule],
    declarations: [FilterComponent],
    exports: [FilterComponent]
})
export class HlcClrFilterModule {}
