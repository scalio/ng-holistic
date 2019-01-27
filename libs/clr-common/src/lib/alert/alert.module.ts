import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrIconModule } from '@clr/angular';
import { HlcClrAlertComponent } from './alert.component';

@NgModule({
    declarations: [HlcClrAlertComponent],
    exports: [HlcClrAlertComponent],
    imports: [CommonModule, ClrIconModule],
    providers: []
})
export class HlcClrAlertModule {}
