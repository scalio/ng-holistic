import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcClrSelectModule } from '../select/select.module';
import { HlcClrMonthYearSelectComponent } from './month-year-select.component';

@NgModule({
    imports: [CommonModule, HlcClrSelectModule],
    declarations: [HlcClrMonthYearSelectComponent],
    exports: [HlcClrMonthYearSelectComponent],
    providers: []
})
export class HlcClrMonthYearSelectModule {
    constructor() {}
}
