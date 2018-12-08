import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrIconModule } from '@clr/angular';
import { FormErrorComponent } from './form-error.component';

@NgModule({
    declarations: [FormErrorComponent],
    exports: [FormErrorComponent],
    imports: [CommonModule, ClrIconModule],
    providers: []
})
export class FormErrorModule {}
