import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppsSharedModule } from '@apps/shared';
import { ClrButtonGroupModule } from '@clr/angular';
import { HlcClrFormFooterModule } from '@ng-holistic/clr-common';
import { HlcClrFormModule } from '@ng-holistic/clr-forms';
import { ExampleSourceModule } from '../../example-source';
import { FormPageComponent } from './form-page.component';

///
@NgModule({
    declarations: [FormPageComponent],
    imports: [
        CommonModule,
        ExampleSourceModule,
        HlcClrFormModule,
        HlcClrFormFooterModule,
        ClrButtonGroupModule,
        AppsSharedModule
    ],
    exports: []
})
export class FormPageModule {}
