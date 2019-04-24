import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppsSharedModule } from '@apps/shared';
import { HlcClrFormModule } from '@ng-holistic/clr-forms';
import { ExampleSourceModule } from '../../example-source';
import { FormFullPageComponent } from './form-full-page.component';

///
@NgModule({
    declarations: [FormFullPageComponent],
    imports: [CommonModule, ExampleSourceModule, HlcClrFormModule, AppsSharedModule],
    exports: []
})
export class FormFullPageModule {}
