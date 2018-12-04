import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DateModule } from '../date';
import { DateRangeComponent } from './date-range.component';

@NgModule({
    imports: [CommonModule, DateModule],
    declarations: [DateRangeComponent],
    exports: [DateRangeComponent]
})
export class DateRangeModule {
    constructor() {}
}
