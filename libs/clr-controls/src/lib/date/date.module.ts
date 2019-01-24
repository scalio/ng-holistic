import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrDatepickerModule, ClrIconModule } from '@clr/angular';
import { DateConvertService } from '../date-convert.service';
import { DateComponent } from './date.component';

@NgModule({
    imports: [CommonModule, ClrDatepickerModule, ClrIconModule],
    declarations: [DateComponent],
    exports: [DateComponent],
    providers: [DateConvertService],
    entryComponents: [DateComponent]
})
export class HlcClrDateModule {
    constructor() {}
}
