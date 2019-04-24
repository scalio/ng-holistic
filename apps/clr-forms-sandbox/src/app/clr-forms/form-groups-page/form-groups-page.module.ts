import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppsSharedModule } from '@apps/shared';
import { HlcClrFormModule } from '@ng-holistic/clr-forms';
import { ExampleSourceModule } from '../../example-source';
import { FormGroupsPageComponent } from './form-groups-page.component';

///
@NgModule({
    declarations: [FormGroupsPageComponent],
    imports: [CommonModule, ExampleSourceModule, HlcClrFormModule, AppsSharedModule],
    exports: []
})
export class FormGroupsPageModule {}
