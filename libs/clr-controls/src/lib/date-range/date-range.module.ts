import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcClrDateModule } from '../date/date.module';
import { HlcClrDateRangeComponent } from './date-range.component';

@NgModule({
    imports: [CommonModule, HlcClrDateModule],
    declarations: [HlcClrDateRangeComponent],
    exports: [HlcClrDateRangeComponent]
})
export class HlcClrDateRangeModule {
    constructor() {}
}
