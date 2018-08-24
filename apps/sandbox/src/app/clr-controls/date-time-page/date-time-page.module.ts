import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTimeModule } from '@ng-holistic/clr-controls';
import { DateTimePageComponent } from './date-time-page.component';

@NgModule({
    declarations: [DateTimePageComponent],
    imports: [CommonModule, DateTimeModule],
    exports: [DateTimePageComponent]
})
export class DateTimePageModule {}
