import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcClrFormModule, HlcClrInputContainerModule } from '@ng-holistic/clr-forms';
import { FormCustomFieldsPageComponent } from './form-custom-fields-page.component';
import { HlcClrTextModule } from '@ng-holistic/clr-controls';
import { ExampleSourceModule } from '../../example-source';

///
@NgModule({
    declarations: [FormCustomFieldsPageComponent],
    imports: [CommonModule, ExampleSourceModule, HlcClrFormModule, HlcClrInputContainerModule, HlcClrTextModule],
    exports: []
})
export class FormCustomFieldsPageModule {}
