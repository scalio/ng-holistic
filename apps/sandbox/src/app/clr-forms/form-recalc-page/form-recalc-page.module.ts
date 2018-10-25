import { NgModule } from '@angular/core';
import { ClrFormModule } from '@ng-holistic/clr-forms';
import { FormRecalcPageComponent } from './form-recalc-page.component';

///
@NgModule({
    declarations: [FormRecalcPageComponent],
    imports: [ClrFormModule],
    exports: [FormRecalcPageComponent]
})
export class FormReclcPageModule {}
