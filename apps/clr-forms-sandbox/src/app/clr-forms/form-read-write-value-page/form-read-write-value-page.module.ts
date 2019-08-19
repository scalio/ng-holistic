import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppsSharedModule } from '@apps/shared';
import { ClrButtonGroupModule } from '@clr/angular';
import { HlcClrFormFooterModule } from '@ng-holistic/clr-common';
import { HlcClrFormModule } from '@ng-holistic/clr-forms';
import { ExampleSourceModule } from '../../example-source';
import { DataService } from './data.service';
import { FormReadWriteValuePageComponent } from './form-read-write-value-page.component';

///
@NgModule({
    declarations: [FormReadWriteValuePageComponent],
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
export class FormReadWriteValuePageModule {}
