import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrLoadingModule, ClrLoadingButtonModule, ClrIconModule } from '@clr/angular';
import { FormFooterComponent } from './form-footer.component';
import { HlcClrFormErrorModule } from '../form-error/form-error.module';

@NgModule({
    declarations: [FormFooterComponent],
    exports: [FormFooterComponent],
    imports: [CommonModule, ClrLoadingModule, ClrLoadingButtonModule, ClrIconModule, HlcClrFormErrorModule],
    providers: []
})
export class HlcClrFormFooterModule {}
