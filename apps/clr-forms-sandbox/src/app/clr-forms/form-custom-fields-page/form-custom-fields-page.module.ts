import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppsSharedModule } from '@apps/shared';
import { HlcClrTextModule } from '@ng-holistic/clr-controls';
import { HlcClrFormModule, HlcClrInputContainerModule } from '@ng-holistic/clr-forms';
import { ExampleSourceModule } from '../../example-source';
import { FormCustomFieldsPageComponent } from './form-custom-fields-page.component';

///
@NgModule({
    declarations: [FormCustomFieldsPageComponent],
    imports: [
        CommonModule,
        ExampleSourceModule,
        HlcClrFormModule,
        HlcClrInputContainerModule,
        HlcClrTextModule,
        AppsSharedModule
    ],
    exports: []
})
export class FormCustomFieldsPageModule {}
