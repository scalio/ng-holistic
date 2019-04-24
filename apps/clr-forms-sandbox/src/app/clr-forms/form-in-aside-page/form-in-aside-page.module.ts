import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppsSharedModule } from '@apps/shared';
import { HlcClrAsidePanelModule, HlcClrFormFooterModule, HlcClrModalModule } from '@ng-holistic/clr-common';
import { HlcClrFormModule } from '@ng-holistic/clr-forms';
import { FormInAsidePageComponent } from './form-in-aside-page.component';

///
@NgModule({
    declarations: [FormInAsidePageComponent],
    imports: [
        CommonModule,
        HlcClrModalModule,
        HlcClrFormModule,
        HlcClrAsidePanelModule,
        HlcClrFormFooterModule,
        AppsSharedModule
    ]
})
export class FormInAsidePageModule {}
