import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppsSharedModule } from '@apps/shared';
import { ClrButtonGroupModule } from '@clr/angular';
import { HlcClrFormFooterModule } from '@ng-holistic/clr-common';
import { HlcClrFormModule } from '@ng-holistic/clr-forms';
import { ExampleSourceModule } from '../../example-source';
import { DataService } from './data.service';
import { FormFooterPageComponent } from './form-footer-page.component';

///
@NgModule({
    declarations: [FormFooterPageComponent],
    imports: [
        CommonModule,
        ExampleSourceModule,
        HlcClrFormModule,
        HlcClrFormFooterModule,
        ClrButtonGroupModule,
        AppsSharedModule
    ],
    providers: [DataService],
    exports: []
})
export class FormFooterPageModule {}
