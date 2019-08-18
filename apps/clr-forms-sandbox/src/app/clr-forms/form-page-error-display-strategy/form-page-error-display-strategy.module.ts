import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppsSharedModule } from '@apps/shared';
import { ClrButtonGroupModule } from '@clr/angular';
import { HlcClrFormFooterModule } from '@ng-holistic/clr-common';
import { HlcClrFormModule, InputErrorDisplayStrategy } from '@ng-holistic/clr-forms';
import { ExampleSourceModule } from '../../example-source';
import { FormPageErrorDisplayStrategyComponent } from './form-page-error-display-strategy.component';

///
@NgModule({
    declarations: [FormPageErrorDisplayStrategyComponent],
    imports: [
        CommonModule,
        ExampleSourceModule,
        HlcClrFormModule,
        HlcClrFormFooterModule,
        ClrButtonGroupModule,
        AppsSharedModule
    ],
    exports: [],
    providers: [
        // This service manage how validation error is displayed
        // Default implementation is to display error when  validating field is dirty
        // You can override this behavior by providing another implementation of this service   
        InputErrorDisplayStrategy
    ]
})
export class FormPageErrorDisplayStrategyModule {}
