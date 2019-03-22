import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrButtonGroupModule } from '@clr/angular';
import { HlcClrFormFooterModule } from '@ng-holistic/clr-common';
import { HlcClrOptionsModule } from '@ng-holistic/clr-controls';
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
        HlcClrOptionsModule
    ],
    exports: []
})
export class FormPageModule {}
