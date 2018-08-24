import { NgModule } from '@angular/core';
import { SelectModule } from '../select';
import { DateTimeComponent } from './date-time.component';
import { ClrDatepickerModule, ClrIconModule } from '@clr/angular';
import { DateConvertService } from '../date-convert.service';

@NgModule({
    imports: [SelectModule, ClrDatepickerModule, ClrIconModule],
    declarations: [DateTimeComponent],
    exports: [DateTimeComponent],
    providers: [DateConvertService]
})
export class HlcDateTimeModule {
    constructor() {}
}
