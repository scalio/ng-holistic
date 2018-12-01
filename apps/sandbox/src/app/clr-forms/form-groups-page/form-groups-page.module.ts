import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrFormModule } from '@ng-holistic/clr-forms';
import { FormGroupsPageComponent } from './form-groups-page.component';
import { ExampleSourceModule } from '../../example-source';

///
@NgModule({
    declarations: [FormGroupsPageComponent],
    imports: [CommonModule, ExampleSourceModule, ClrFormModule],
    exports: []
})
export class FormGroupsPageModule {}
