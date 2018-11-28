import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrFormModule } from '@ng-holistic/clr-forms';
import { FormDynaPageComponent } from './form-dyna-page.component';

///
@NgModule({
    declarations: [FormDynaPageComponent],
    imports: [CommonModule, ClrFormModule],
    exports: []
})
export class FormDynaPageModule {}
