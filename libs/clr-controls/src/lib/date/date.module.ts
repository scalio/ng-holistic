import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrDatepickerModule, ClrIconModule } from '@clr/angular';
import { DateConvertService } from '../date-convert.service';
import { HlcClrDateComponent } from './date.component';

@NgModule({
    imports: [CommonModule, ClrDatepickerModule, ClrIconModule],
    declarations: [HlcClrDateComponent],
    exports: [HlcClrDateComponent],
    providers: [DateConvertService],
    entryComponents: [HlcClrDateComponent]
})
export class HlcClrDateModule {
    constructor() {}
}
