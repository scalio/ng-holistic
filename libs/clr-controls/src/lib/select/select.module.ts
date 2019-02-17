import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ClrDropdownModule, ClrIconModule } from '@clr/angular';
import { HlcClrSelectComponent } from './select.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [BrowserModule, ClrIconModule, ClrDropdownModule, ReactiveFormsModule],
    declarations: [HlcClrSelectComponent],
    exports: [HlcClrSelectComponent]
})
export class HlcClrSelectModule {
    constructor() {}
}
