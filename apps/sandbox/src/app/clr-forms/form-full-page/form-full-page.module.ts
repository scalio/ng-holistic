import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcClrFormModule } from '@ng-holistic/clr-forms';
import { FormFullPageComponent } from './form-full-page.component';
import { ExampleSourceModule } from '../../example-source';

///
@NgModule({
    declarations: [FormFullPageComponent],
    imports: [CommonModule, ExampleSourceModule, HlcClrFormModule],
    exports: []
})
export class FormFullPageModule {}
