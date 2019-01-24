import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcClrDateModule } from '../date/date.module';
import { DateRangeComponent } from './date-range.component';

@NgModule({
    imports: [CommonModule, HlcClrDateModule],
    declarations: [DateRangeComponent],
    exports: [DateRangeComponent]
})
export class HlcClrDateRangeModule {
    constructor() {}
}
