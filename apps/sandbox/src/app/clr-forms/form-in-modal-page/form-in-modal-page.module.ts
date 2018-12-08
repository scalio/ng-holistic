import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HlcClrModalModule } from '@ng-holistic/clr-common';
import { FormReclcPageModule } from '../form-recalc-page/form-recalc-page.module';
import { FormInModalPageComponent } from './form-in-modal-page.component';
import { FormRecalcPageComponent } from '../form-recalc-page/form-recalc-page.component';

///
@NgModule({
    declarations: [FormInModalPageComponent],
    imports: [CommonModule, FormReclcPageModule, HlcClrModalModule],
    exports: [FormInModalPageComponent],
    entryComponents: [FormRecalcPageComponent]
})
export class FormInModalPageModule {}
