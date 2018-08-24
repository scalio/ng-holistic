import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClrDatepickerModule, ClrIconModule } from '@clr/angular';
import { SelectModule } from '../select';
import { DateRangeComponent } from './date-range.component';
import { DateConvertService } from '../date-convert.service';

@NgModule({
    imports: [SelectModule, ClrDatepickerModule, ClrIconModule, FormsModule],
    declarations: [DateRangeComponent],
    exports: [DateRangeComponent],
    providers: [DateConvertService]
})
export class DateRangeModule {
    constructor() {}
}
