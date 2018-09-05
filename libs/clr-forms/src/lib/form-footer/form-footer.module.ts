import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormFooterComponent } from './form-footer.component';

@NgModule({
    declarations: [FormFooterComponent],
    exports: [FormFooterComponent],
    imports: [BrowserModule, CommonModule],
    providers: [],
})
export class FormFooterModule {}
