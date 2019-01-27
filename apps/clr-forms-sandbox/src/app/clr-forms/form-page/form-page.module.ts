import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcClrFormModule } from '@ng-holistic/clr-forms';
import { FormPageComponent } from './form-page.component';
import { ExampleSourceModule } from '../../example-source';
import { HlcClrFormFooterModule } from '@ng-holistic/clr-common';

///
@NgModule({
    declarations: [FormPageComponent],
    imports: [CommonModule, ExampleSourceModule, HlcClrFormModule, HlcClrFormFooterModule],
    exports: []
})
export class FormPageModule {}
