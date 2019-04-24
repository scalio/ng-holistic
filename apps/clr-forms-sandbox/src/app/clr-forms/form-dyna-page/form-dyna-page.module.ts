import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcClrFormModule } from '@ng-holistic/clr-forms';
import { FormDynaPageComponent } from './form-dyna-page.component';
import { ExampleSourceModule } from '../../example-source';
import { AppsSharedModule } from '@apps/shared';

///
@NgModule({
    declarations: [FormDynaPageComponent],
    imports: [CommonModule, ExampleSourceModule, HlcClrFormModule, AppsSharedModule],
    exports: []
})
export class FormDynaPageModule {}
