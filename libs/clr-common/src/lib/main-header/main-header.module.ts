import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ClrDropdownModule, ClrIconModule, ClrMainContainerModule } from '@clr/angular';
import { HlcClrMainHeaderComponent } from './main-header.component';

@NgModule({
    imports: [BrowserModule, ClrMainContainerModule, RouterModule, ClrIconModule, ClrDropdownModule],
    declarations: [HlcClrMainHeaderComponent],
    exports: [HlcClrMainHeaderComponent]
})
export class HlcClrMainHeaderModule {
    constructor() {}
}
