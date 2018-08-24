import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateRangeModule } from '@ng-holistic/clr-controls';
import { DateRangePageComponent } from './date-range-page.component';

@NgModule({
    declarations: [DateRangePageComponent],
    imports: [CommonModule, DateRangeModule],
    exports: [DateRangePageComponent]
})
export class DateRangePageModule {}
