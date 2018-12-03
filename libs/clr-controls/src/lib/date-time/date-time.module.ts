import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrDatepickerModule, ClrIconModule } from '@clr/angular';
import { DateConvertService } from '../date-convert.service';
import { DateTimeComponent } from './date-time.component';
import { SelectModule } from '../select';

@NgModule({
    imports: [CommonModule, ClrDatepickerModule, ClrIconModule, SelectModule],
    declarations: [DateTimeComponent],
    exports: [DateTimeComponent],
    providers: [DateConvertService]
})
export class DateTimeModule {
    constructor() {}
}
