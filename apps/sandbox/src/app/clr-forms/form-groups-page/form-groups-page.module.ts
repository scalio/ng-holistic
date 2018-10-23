import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrFormModule } from '@ng-holistic/clr-forms';
import { FormGroupsPageComponent } from './form-groups-page.component';

///
@NgModule({
    declarations: [FormGroupsPageComponent],
    imports: [CommonModule, ClrFormModule],
    exports: []
})
export class FormGroupsPageModule {}
