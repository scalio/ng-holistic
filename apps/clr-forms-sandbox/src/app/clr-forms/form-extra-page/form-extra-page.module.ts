import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppsSharedModule } from '@apps/shared';
import { HlcClrFormModule } from '@ng-holistic/clr-forms';
import { FormExtraPageComponent } from './form-extra-page.component';

///
@NgModule({
    declarations: [FormExtraPageComponent],
    imports: [CommonModule, HlcClrFormModule, AppsSharedModule],
    exports: []
})
export class FormExtraPageModule {}
