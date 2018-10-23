import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrFormModule } from '@ng-holistic/clr-forms';
import { FormPageComponent } from './form-page.component';

///
@NgModule({
    declarations: [FormPageComponent],
    imports: [CommonModule, ClrFormModule],
    exports: []
})
export class FormPageModule {}
