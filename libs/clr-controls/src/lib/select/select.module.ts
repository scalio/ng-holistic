import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ClrDropdownModule, ClrIconModule } from '@clr/angular';
import { SelectComponent } from './select.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [BrowserModule, ClrIconModule, ClrDropdownModule, ReactiveFormsModule],
    declarations: [SelectComponent],
    exports: [SelectComponent],
})
export class SelectModule {
    constructor() {}
}
