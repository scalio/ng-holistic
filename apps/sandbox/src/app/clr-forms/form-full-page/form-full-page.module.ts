import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrFormModule } from '@ng-holistic/clr-forms';
import { FormFullPageComponent } from './form-full-page.component';

///
@NgModule({
    declarations: [FormFullPageComponent],
    imports: [CommonModule, ClrFormModule],
    exports: []
})
export class FormFullPageModule {}
