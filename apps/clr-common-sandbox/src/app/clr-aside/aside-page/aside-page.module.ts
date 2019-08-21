import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClrInputModule } from '@clr/angular';
import { HlcClrAsidePanelModule, HlcClrModalModule } from '@ng-holistic/clr-common';
import { HlcClrFormModule } from '@ng-holistic/clr-forms';
import { AsidePageComponent } from './aside-page.component';
import { AppsSharedModule } from '@apps/shared';

@NgModule({
    declarations: [AsidePageComponent],
    imports: [
        CommonModule,
        HlcClrModalModule,
        ReactiveFormsModule,
        HlcClrFormModule,
        ClrInputModule,
        HlcClrAsidePanelModule,
        AppsSharedModule
    ],
    exports: [AsidePageComponent]
})
export class AsidePageModule {}
