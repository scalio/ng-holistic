import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcClrFormModule } from '@ng-holistic/clr-forms';
import { FormDynaPageComponent } from './form-dyna-page.component';
import { ExampleSourceModule } from '../../example-source';

///
@NgModule({
    declarations: [FormDynaPageComponent],
    imports: [CommonModule, ExampleSourceModule, HlcClrFormModule],
    exports: []
})
export class FormDynaPageModule {}
