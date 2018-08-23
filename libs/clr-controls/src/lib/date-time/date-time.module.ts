import { NgModule } from '@angular/core';
import { SelectModule } from '../select';
import { DateTimeComponent } from './date-time.component';
import { ClrDatepickerModule, ClrIconModule } from '@clr/angular';

@NgModule({
    imports: [SelectModule, ClrDatepickerModule, ClrIconModule],
    declarations: [DateTimeComponent],
    exports: [DateTimeComponent]
})
export class HlcDateTimeModule {
    constructor() {}
}
