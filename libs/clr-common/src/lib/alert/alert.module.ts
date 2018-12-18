import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrIconModule } from '@clr/angular';
import { AlertComponent } from './alert.component';

@NgModule({
    declarations: [AlertComponent],
    exports: [AlertComponent],
    imports: [CommonModule, ClrIconModule],
    providers: []
})
export class HlcClrAlertModule {}
