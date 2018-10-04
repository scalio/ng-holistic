import { NgModule } from '@angular/core';
import { SelectModule } from '../select';
import { DateComponent } from './date.component';
import { ClrDatepickerModule, ClrIconModule } from '@clr/angular';
import { DateConvertService } from '../date-convert.service';

@NgModule({
    imports: [SelectModule, ClrDatepickerModule, ClrIconModule],
    declarations: [DateComponent],
    exports: [DateComponent],
    providers: [DateConvertService]
})
export class DateModule {
    constructor() {}
}
