import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrLoadingModule, ClrLoadingButtonModule, ClrIconModule } from '@clr/angular';
import { FormFooterComponent } from './form-footer.component';

@NgModule({
    declarations: [FormFooterComponent],
    exports: [FormFooterComponent],
    imports: [CommonModule, ClrLoadingModule, ClrLoadingButtonModule, ClrIconModule],
    providers: []
})
export class FormFooterModule {}
