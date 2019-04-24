import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppsSharedModule } from '@apps/shared';
import { HlcClrFormModule } from '@ng-holistic/clr-forms';
import { ExampleSourceModule } from '../../example-source';
import { FormRecalcPageComponent } from './form-recalc-page.component';

///
@NgModule({
    declarations: [FormRecalcPageComponent],
    imports: [CommonModule, ExampleSourceModule, HlcClrFormModule, AppsSharedModule],
    exports: [FormRecalcPageComponent]
})
export class FormReclcPageModule {}
