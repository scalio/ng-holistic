import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrLoadingModule, ClrLoadingButtonModule, ClrIconModule } from '@clr/angular';
import { HlcClrFormFooterComponent } from './form-footer.component';
import { HlcClrFormErrorModule } from '../form-error/form-error.module';

@NgModule({
    declarations: [HlcClrFormFooterComponent],
    exports: [HlcClrFormFooterComponent],
    imports: [CommonModule, ClrLoadingModule, ClrLoadingButtonModule, ClrIconModule, HlcClrFormErrorModule],
    providers: []
})
export class HlcClrFormFooterModule {}
