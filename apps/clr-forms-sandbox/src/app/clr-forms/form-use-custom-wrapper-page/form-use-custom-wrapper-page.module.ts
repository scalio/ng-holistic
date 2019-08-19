import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppsSharedModule } from '@apps/shared';
import { ClrIconModule } from '@clr/angular';
import { HlcClrFormModule } from '@ng-holistic/clr-forms';
import { ExampleSourceModule } from '../../example-source';
import { CustomFieldWrapperComponent } from './custom-field-wrapper.component';
import { FormUseCustomWrapperPageComponent } from './form-use-custom-wrapper-page.component';

///
@NgModule({
    declarations: [FormUseCustomWrapperPageComponent, CustomFieldWrapperComponent],
    imports: [CommonModule, ExampleSourceModule, HlcClrFormModule, ClrIconModule, AppsSharedModule],
    exports: [],
    entryComponents: [CustomFieldWrapperComponent]
})
export class FormUseCustomWrapperPageModule {}
