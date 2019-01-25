import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrDatepickerModule, ClrIconModule } from '@clr/angular';
import { DateConvertService } from '../date-convert.service';
import { HlcClrDateTimeComponent } from './date-time.component';
import { HlcClrSelectModule } from '../select/select.module';

@NgModule({
    imports: [CommonModule, ClrDatepickerModule, ClrIconModule, HlcClrSelectModule],
    declarations: [HlcClrDateTimeComponent],
    exports: [HlcClrDateTimeComponent],
    providers: [DateConvertService]
})
export class HlcClrDateTimeModule {
    constructor() {}
}
